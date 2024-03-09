<?php

namespace App\Http\Controllers;


use App\Models\SalaryHistory;
use App\Models\Users;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Http\JsonResponse;

//
class DashboardController extends Controller
{
    public function getDashboardData(): JsonResponse
    {
        try {
            //total user count
            $userCount = Users::count();

            // Get the current date and time
            $today = Carbon::now();

            $data = [
                'today' => $today,
                'userCount' => $userCount
            ];

            return response()->json($data, 200);
        } catch (Exception $exception) {
            return response()->json(['error' => 'An error occurred during getting Dashboard Data. Please try again later.'], 500);
        }
    }
}
