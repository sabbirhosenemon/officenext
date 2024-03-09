<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\jsonResponse;
use Exception;
use Illuminate\Support\Str;
use App\Models\Designation;
use App\Models\Users;
//
class DesignationController extends Controller
{
    // create designation controller method
    public function createSingleDesignation(Request $request): jsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                // delete many Designation at once
                $data = json_decode($request->getContent(), true);
                $deletedDesignation = Designation::destroy($data);

                $deletedCounted = [
                    'count' => $deletedDesignation,
                ];

                return response()->json($deletedCounted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during delete designation. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $designations = json_decode($request->getContent(), true);
                $createdDesignation = collect($designations)->map(function ($designation) {
                    return Designation::create([
                        'name' => $designation['name'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdDesignation->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
            }
        } else {
            try {
                $createdDesignation = Designation::create([
                    'name' => $request->input('name'),
                ]);

                $converted = arrayKeysToCamelCase($createdDesignation->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
            }
        }
    }

    // get all the designation controller method
    public function getAllDesignation(Request $request): jsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', "true")
                    ->get();

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
            }
        } else if ($request->query('status') === 'false') {
            $pagination = getPagination($request->query());
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', "false")
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                $aggregation = [
                    'getAllDesignation' => $converted,
                    'totalDesignation' => Designation::where('status', 'false')->count()
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            $pagination = getPagination($request->query());
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', 'true')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                $aggregation = [
                    'getAllDesignation' => $converted,
                    'totalDesignation' => Designation::where('status', 'true')->count()
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query!'], 400);
        }
    }

    // update a designation controller method
    public function getSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $singeDesignation = Designation::where('id', $id)->first();

            if (!$singeDesignation) {
                return response()->json(['error' => 'No designation found!'], 404);
            }

            $converted = arrayKeysToCamelCase($singeDesignation->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
        }
    }

    // update a designation controller method
    public function updateSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $updatedDesignation = Designation::where('id', $id)->update($request->all());

            if (!$updatedDesignation) {
                return response()->json(['error' => 'Failed to update Designation!'], 404);
            }
            return response()->json(['message' => 'Designation updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update designation. Please try again later.'], 500);
        }
    }

    // delete a designation controller method
    public function deleteSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $deletedDesignation = Designation::where('id', $id)->delete();

            if ($deletedDesignation) {
                return response()->json(['message' => 'Designation Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed To Delete Designation'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting designation. Please try again later.'], 500);
        }
    }

    // get all allDesignationWiseEmployee controller method
    public function allDesignationWiseEmployee(Request $request): jsonResponse
    {
        try {
            $allEmployee = Users::with(['designationHistory' => function ($query) {
                $query->orderBy('id', 'desc');
            }, 'designationHistory.designation:id,name'])->orderBy('id', 'desc')->select(['id', 'firstName', 'lastName'])->get();

            $data = $allEmployee->map(function ($singleData) {
                return [
                    'designationId' => $singleData->designationHistory->first() ? $singleData->designationHistory->first()->designation->id : null,
                    'designationName' => $singleData->designationHistory->first() ?  $singleData->designationHistory->first()->designation->name : null,
                    'employee' => [
                        [
                            'id' => $singleData->id,
                            'firstName' => $singleData->firstName,
                            'lastName' => $singleData->lastName,
                        ]
                    ],
                ];
            });

            $result = [];
            foreach ($data as $current) {
                $found = false;
                foreach ($result as &$item) {
                    if ($item['designationId'] === $current['designationId']) {
                        $item['employee'][] = $current['employee'][0];
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $result[] = $current;
                }
            }


            // get all designation and map it with the result
            $allDesignation = Designation::orderBy('id', 'asc')->get();
            $converted = arrayKeysToCamelCase($allDesignation->toArray());
            $finalResult = [];
            foreach ($converted as $designation) {
                $x = null;
                foreach ($result as $i) {
                    if ($i['designationId'] === $designation['id']) {
                        $x = $i;
                        break;
                    }
                }
                if (!$x) {
                    $finalResult[] = [
                        'designationId' => $designation['id'],
                        'designationName' => $designation['name'],
                        'employee' => [],
                    ];
                } else {
                    $finalResult[] = $x;
                }
            }


            return response()->json($finalResult, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
        }
    }

    // get single designation wise employees
    public function singleDesignationWiseEmployee(Request $request, $id): jsonResponse
    {
        try {
            $allEmployee = Users::with(['designationHistory' => function ($query) {
                $query->orderBy('id', 'desc');
            }, 'designationHistory.designation:id,name'])->orderBy('id', 'desc')->select(['id', 'firstName', 'lastName'])->get();

            $data = $allEmployee->map(function ($singleData) {
                return [
                    'designationId' => $singleData->designationHistory->first() ? $singleData->designationHistory->first()->designation->id : null,
                    'designationName' => $singleData->designationHistory->first() ?  $singleData->designationHistory->first()->designation->name : null,
                    'employee' => [
                        [
                            'id' => $singleData->id,
                            'firstName' => $singleData->firstName,
                            'lastName' => $singleData->lastName,
                        ]
                    ],
                ];
            });

            $result = [];
            foreach ($data as $current) {
                $found = false;
                foreach ($result as &$item) {
                    if ($item['designationId'] === $current['designationId']) {
                        $item['employee'][] = $current['employee'][0];
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $result[] = $current;
                }
            }


            // get all designation and map it with the result
            $allDesignation = Designation::where('id', $id)->orderBy('id', 'asc')->get();

            $converted = arrayKeysToCamelCase($allDesignation->toArray());
            $finalResult = [];
            foreach ($converted as $designation) {
                $x = null;
                foreach ($result as $i) {
                    if ($i['designationId'] === $designation['id']) {
                        $x = $i;
                        break;
                    }
                }
                if (!$x) {
                    $finalResult[] = [
                        'designationId' => $designation['id'],
                        'designationName' => $designation['name'],
                        'employee' => [],
                    ];
                } else {
                    $finalResult[] = $x;
                }
            }

            return response()->json($finalResult[0], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting designation. Please try again later.'], 500);
        }
    }
}
