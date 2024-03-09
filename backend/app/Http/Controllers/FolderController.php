<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use App\Models\NestedFolder;
use Exception;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class FolderController extends Controller
{
    public function createFolder(Request $request): JsonResponse
    {
        if ($request->query('parentId')) {
            try {
                $parentData = Folder::where('id', $request->query('parentId'))->first();
                if (!$parentData) {
                    return response()->json(['error' => 'Parent Folder Not Found!'], 404);
                }

                $nestedData = NestedFolder::where('parentFolderId', $parentData->id)->pluck('childFolderId');
                $nestedChildData = Folder::whereIn('id', $nestedData->toArray())->get();
                $matchedData = collect($nestedChildData)->where('name', $request->input('name'))->first();

                if ($matchedData) {
                    return response()->json(['error' => 'already exist!'], 400);
                }

                $createdFolder = Folder::create([
                    'name' => $request->input('name'),
                ]);

                if ($createdFolder) {
                    NestedFolder::create([
                        'parentFolderId' => $request->query('parentId'),
                        'childFolderId' => $createdFolder->id,
                    ]);
                }
                $converted = arrayKeysToCamelCase($createdFolder->toArray());
                return response()->json($converted, 201);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during creating a single Folder. Please try again later.'], 500);
            }
        } else {
            try {
                $singleFolderData = Folder::where('name', $request->input('name'))->first();
                if ($singleFolderData) {
                    return response()->json(['error' => 'already exist!'], 400);
                }

                $createdFolder = Folder::create([
                    'name' => $request->input('name'),
                ]);
                $converted = arrayKeysToCamelCase($createdFolder->toArray());
                return response()->json($converted, 201);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during creating a single Folder. Please try again later.'], 500);
            }
        }
    }

    public function getAllFolder(Request $request): JsonResponse
    {
        if ($request->query('parentId')) {
            try {
                $allChildFolderId = NestedFolder::where('parentFolderId', $request->query('parentId'))->pluck('childFolderId');

                $allFolder = Folder::whereIn('id', $allChildFolderId->toArray())
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allFolder->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
            }
        } else {
            try {
                $allChildFolderId = NestedFolder::pluck('childFolderId');

                $allFolder = Folder::whereNotIn('id', $allChildFolderId->toArray())
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allFolder->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
            }
        }
    }

    public function getSingleFolder(Request $request, $id): JsonResponse
    {
        try {
            $singleFolder = Folder::where('id', $id)->first();
            $converted = arrayKeysToCamelCase($singleFolder->toArray());

            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting Folder. Please try again later.'], 500);
        }
    }

    public function updateSingleFolder(Request $request, $id): JsonResponse
    {
        try {
            $updatedFolder = Folder::where('id', $id)->first();
            if (!$updatedFolder) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $updatedFolder->update([
                'name' => $request->input('name')
            ]);

            $converted = arrayKeysToCamelCase($updatedFolder->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during updating Folder. Please try again later.'], 500);
        }
    }

    public function deleteSingleFolder(Request $request, $id): JsonResponse
    {
        try {
            $folderData = Folder::where('id', $id)->first();
            if (!$folderData) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $nestedData = NestedFolder::where('parentFolderId', $folderData->id)->first();
            if ($nestedData) {
                return response()->json(['error' => 'Failed to delete Folder!, need to delete nested folder first'], 400);
            }

            $fileData = File::where('folderId', $folderData->id)->first();
            if ($fileData) {
                return response()->json(['error' => 'Failed to delete Folder!, need to delete inside the File first'], 400);
            }

            $childData = NestedFolder::where('childFolderId', $folderData->id)->first();
            if ($childData) {
                $deletedChild = NestedFolder::where('childFolderId', $folderData->id)->delete();
            }

            if ($deletedChild) {
                $deletedFolder = Folder::where('id', $id)->delete();
            }

            if ($deletedFolder) {
                return response()->json(['message' => 'Folder Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed to delete Folder!'], 400);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting Folder. Please try again later.', $err->getMessage()], 500);
        }
    }

    public function getFolderDirectory(Request $request, $id): JsonResponse
    {
        try {

            $folderData = Folder::where('id', $id)->first();
            if (!$folderData) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $childId = $id;
            $directoryPath = '';

            do {
                $nestedFolder = NestedFolder::where('childFolderId', $childId)->with('folderOfParent', 'folderOfChild')->first();

                if ($nestedFolder) {
                    $directoryPath = $nestedFolder->folderOfParent->name . '/' . $directoryPath;
                    $childId = $nestedFolder->parentFolderId;
                }
            } while ($nestedFolder);

            return response()->json(['folderDirectory' => '/' . $directoryPath, 'folderName' => $folderData->name], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting Folder Directory. Please try again later.'], 500);
        }
    }
}
