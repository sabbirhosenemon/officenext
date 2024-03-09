<?php

namespace App\Http\Controllers;

use App\Mail\Sendmail;
use App\Models\AppSetting;
use App\Models\DesignationHistory;
use App\Models\Education;
use App\Models\EmailConfig;
use App\Models\LeaveApplication;
use App\Models\Users;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use App\Models\Role;
use App\Models\SalaryHistory;
use Illuminate\Support\Facades\Mail;

//
class UsersController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {
            $allUser = Users::all();
            $users = json_decode($allUser, true);
            global $isValid;
            foreach ($users as $user) {

                $isValid = $user['username'] == $request['username'] && Hash::check($request['password'], $user['password']);

                $permissions = Role::with('RolePermission.permission')
                    ->where('id', $user['roleId'])
                    ->first();

                $permissionNames = $permissions->RolePermission->map(function ($rp) {
                    return $rp->permission->name;
                });
                if ($isValid) {
                    $userType = Role::where('id', $user['roleId'])->first();

                    $token = array(
                        "sub" => $user['id'],
                        "role" => $userType->name,
                        "permissions" => $permissionNames,
                        "exp" => time() + 86400
                    );

                    $jwt = JWT::encode($token, env('JWT_SECRET'), 'HS256');

                    $userWithoutPassword = $user;
                    unset($userWithoutPassword['password']);
                    $userWithoutPassword['token'] = $jwt;
                    return response()->json($userWithoutPassword);
                }
            }

            return response()->json(['error' => 'Invalid username or password'], 401);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during login. Please try again later.'], 500);
        }
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $joinDate = new DateTime($request->input('joinDate'));
            $leaveDate = $request->input('leaveDate') !== null ? new DateTime($request->input('leaveDate')) : null;

            $designationStartDate = Carbon::parse($request->input('designationStartDate'));
            $designationEndDate = $request->input('designationEndDate') ? Carbon::parse($request->input('designationEndDate')) : null;


            $hash = Hash::make($request->input('password'));

            $createUser = Users::create([
                'firstName' => $request->input('firstName'),
                'lastName' => $request->input('lastName'),
                'username' => $request->input('username'),
                'password' => $hash,
                'email' => $request->input('email'),
                'phone' => $request->input('phone') ?? null,
                'street' => $request->input('street'),
                'city' => $request->input('city'),
                'state' => $request->input('state'),
                'zipCode' => $request->input('zipCode'),
                'country' => $request->input('country'),
                'joinDate' => $joinDate->format('Y-m-d H:i:s'),
                'leaveDate' => $leaveDate?->format('Y-m-d H:i:s'),
                'employeeId' => $request->input('employeeId'),
                'bloodGroup' => $request->input('bloodGroup'),
                'image' => $request->input('image'),
                'departmentId' => $request->input('departmentId'),
                'roleId' => $request->input('roleId'),
            ]);

            //designation history
            $designationHistoryData = DesignationHistory::create([
                'userId' => $createUser->id,
                'designationId' => $request->input('designationId'),
                'startDate' => $designationStartDate,
                'endDate' => $designationEndDate ?? null,
                'comment' => $request->input('comment') ?? null,
            ]);

            $userWithoutPassword = (array)$request->all();
            unset($userWithoutPassword['password']);

            return response()->json($userWithoutPassword, 201);
        } catch (Exception $error) {
            return response()->json([
                'error' =>  'An error occurred during Registration. Please try again later.', $error->getMessage()
            ], 500);
        }
    }

    public function getAllUser(Request $req): JsonResponse
    {
        if ($req->query('query') === 'all') {
            try {
                $allUser = Users::with([
                    'department',
                    'role',
                    'designationHistory.designation'
                ])
                    ->where('status', 'true')
                    ->orderBy('id', "desc")
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });

                $converted = arrayKeysToCamelCase($filteredUsers->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        } elseif ($req->query('status')) {
            try {
                $pagination = getPagination($req->query());
                $allUser = Users::where('status', $req->query('status'))->with([
                    'department',
                    'role',
                    'designationHistory.designation'
                ])
                    ->orderBy('id', "desc")
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });
                $converted = arrayKeysToCamelCase($filteredUsers->toArray());


                $aggregation = [
                    'getAllUser' => $converted,
                    'totalUser' => Users::where('status', $req->query('status'))->count()
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($req->query());
                $allUser = Users::where('status', "true")->with([
                    'department',
                    'role',
                    'designationHistory.designation'
                ])
                    ->orderBy('id', "desc")
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });
                $converted = arrayKeysToCamelCase($filteredUsers->toArray());

                $aggregation = [
                    'getAllUser' => $converted,
                    'totalUser' => Users::where('status', 'true')->count()
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        }
    }

    public function getSingleUser(Request $request): JsonResponse
    {
        try {
            $data = $request->attributes->get("data");

            if ($data['sub'] !== (int)$request['id'] && $data['role'] !== 'admin') {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $singleUser = Users::with(
                'designationHistory.designation',
                'department',
                'role'
            )->where('id', $request['id'])->first();

            $userData = $singleUser->toArray();

            unset($userData['password']);
            $userData = arrayKeysToCamelCase($userData);
            return response()->json($userData, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
        }
    }

    public function updateSingleUser(Request $request, $id): JsonResponse
    {
        try {

            $joinDate = Carbon::parse($request->input('joinDate'));
            $leaveDate = $request->input('leaveDate') ? Carbon::parse($request->input('leaveDate')) : null;
            $hash = Hash::make($request->input('password'));
            //merge the data
            $request->merge([
                'joinDate' => $joinDate ?? null,
                'leaveDate' => $leaveDate ?? null,
                'password' => $hash,
            ]);


            $user = Users::findOrFail($id);
            $user->Update($request->all());
            $userWithoutPassword = $user->toArray();
            unset($userWithoutPassword['password']);

            $converted = arrayKeysToCamelCase($userWithoutPassword);
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
        }
    }

    public function deleteUser(Request $request, $id): JsonResponse
    {
        try {
            //update the status
            $user = Users::findOrFail($id);
            $user->status = $request->input('status');
            $user->save();
            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }
}
