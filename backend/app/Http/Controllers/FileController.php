<?php

namespace App\Http\Controllers;

use App\Models\File;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mockery\Matcher\Any;

class FileController extends Controller
{
    protected function generateFileName($bytes = 4): string
    {
        return bin2hex(random_bytes($bytes));
    }

    // Store files upload folder in disk
    protected function getDestinationPath(): string
    {
        return 'uploads';
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'files.*' => 'required|file|mimes:jpg,jpeg,png,pdf,html,|max:2048'
            ]);

            if ($request->hasFile('files')) {
                if (count($request->file('files')) > 5) {
                    throw new Exception("You can upload a maximum of 5 files!");
                }
                foreach ($request->file('files') as $file) {
                    $filename = time() . '_' . $this->generateFileName() . '_' . $file->getClientOriginalName();

                    $file->storeAs($this->getDestinationPath(), $filename);
                    $createdFile  = File::create([
                        'name' => $file->getClientOriginalName(),
                        'generatedName' => $filename,
                        'type' => $file->guessExtension(),
                        'size' => $file->getSize(),
                        'folderId' => $request->input('folderId') ? $request->input('folderId') : null,
                    ]);
                }
            } else {
                return response()->json(['error' => 'file is required!'], 500);
            }

            return response()->json(['message' => 'File uploaded successfully'], 201);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during uploading Files. Please try again later.', $error->getMessage()], 500);
        }
    }

    public function getFilesByFolderId(Request $request, $id): JsonResponse
    {
        try {
            $allFiles = File::where('folderId', $id)->orderBy('id', 'desc')->get();

            $currentUrl = url('/');
            foreach ($allFiles as $file) {
                $file->viewableUrl = "$currentUrl/files/$file->generatedName";
            }


            $converted = arrayKeysToCamelCase($allFiles->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Files. Please try again later.'], 500);
        }
    }

    public function getFolderLessFiles(Request $request): JsonResponse
    {
        try {
            $allFiles = File::where('folderId', null)->orderBy('id', 'desc')->get();
            $currentUrl = url('/');
            foreach ($allFiles as $file) {
                $file->viewableUrl = "$currentUrl/files/$file->generatedName";
            }

            $converted = arrayKeysToCamelCase($allFiles->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Files. Please try again later.'], 500);
        }
    }

    public function deleteFile(Request $request, $id): JsonResponse
    {
        try {
            $getSingleFile = File::where('id', $id)->first();
            if (!$getSingleFile) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            Storage::delete($this->getDestinationPath() . '/' . $getSingleFile->generatedName);

            $deletedFile = File::where('id', $id)->delete();

            if (!$deletedFile) {
                return response()->json(['error' => 'Failed to delete!'], 400);
            }

            return response()->json(['message' => 'file deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting Files. Please try again later.'], 500);
        }
    }

    public function downloadFile(Request $request, $id)
    {
        try {
            $getSingleFile = File::where('id', $id)->first();
            if (!$getSingleFile) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $file_path = storage_path('app/' . $this->getDestinationPath() . '/' . $getSingleFile->generatedName);
            return response()->download($file_path);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during downloading Files. Please try again later.', $err->getMessage()], 500);
        }
    }
}
