<?php

namespace App\Http\Controllers;
//
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function createSingleRole(Request $request): JsonResponse
    {

        if ($request->query('query') === 'deletemany') {
            try {
                $data = json_decode($request->getContent(), true);
                $deleteMany = Role::destroy($data);

                return response()->json([
                    'count' => $deleteMany,
                ], 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during deleting many Role. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $data = json_decode($request->getContent(), true);
                foreach ($data as $item) {
                    Role::insertOrIgnore($item);
                }
                return response()->json(['count' => $data], 201);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during creating many Role. Please try again later.'], 500);
            }
        } else {
            try {
                $createdRole = Role::create([
                    'name' => $request->input('name'),
                ]);
                $converted = arrayKeysToCamelCase($createdRole->toArray());
                return response()->json($converted, 201);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during creating a single Role. Please try again later.'], 500);
            }
        }
    }

    public function getAllRole(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allRole = Role::orderBy('id', 'asc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($allRole->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
            }
        } elseif ($request->query('status') === 'false') {
            try {
                $pagination = getPagination($request->query());
                $allRole = Role::where('status', "false")
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();
                $converted = arrayKeysToCamelCase($allRole->toArray());
                $aggregation = [
                    'getAllRole' => $converted,
                    'totalRole' => Role::where('status', 'false')->count(),
                ];


                return response()->json($aggregation, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
            }
        } else {
            $pagination = getPagination($request->query());
            try {
                $allRole = Role::where('status', "true")
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allRole->toArray());
                $aggregation = [
                    'getAllRole' => $converted,
                    'totalRole' => Role::where('status', 'true')->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
            }
        }
    }

    public function getSingleRole(Request $request, $id): JsonResponse
    {
        try {
            $singleRole = Role::with('rolePermission.permission')->find($id);
            $converted = arrayKeysToCamelCase($singleRole->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting Role. Please try again later.'], 500);
        }
    }

    public function updateSingleRole(Request $request, $id): JsonResponse
    {
        try {
            $updatedRole = Role::where('id', $id)->first();
            $updatedRole->update([
                'name' => $request->input('name')
            ]);

            $converted = arrayKeysToCamelCase($updatedRole->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during updating Role. Please try again later.'], 500);
        }
    }

    public function deleteSingleRole(Request $request, $id): JsonResponse
    {
        try {
            $deletedRole = Role::where('id', $id)->update([
                'status' => $request->input('status')
            ]);

            if ($deletedRole) {
                return response()->json(['message' => 'Role Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed to delete Role!'], 404);
            }
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during deleting Role. Please try again later.'], 500);
        }
    }
}
