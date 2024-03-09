<?php

namespace App\Http\Controllers;

use App\Models\AssignedTask;
use App\Models\Task;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //create task
    public function createTask(Request $request): JsonResponse
    {
        try {
            $createTask = Task::create([
                'projectId' => $request->projectId,
                'milestoneId' => $request->milestoneId,
                'priorityId' => $request->priorityId,
                'taskStatusId' => $request->taskStatusId,
                'name' => $request->name,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'completionTime' => $request->completionTime,
                'description' => $request->description
            ]);

            //create assigned task
            foreach ($request->assignedTask as $item) {
                AssignedTask::create([
                    'taskId' => $createTask->id,
                    'userId' => $item,
                ]);
            }

            $converted = arrayKeysToCamelCase($createTask->toArray());
            return response()->json($converted, 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during creating Task. Please try again later.'], 500);
        }
    }

    //get all task
    public function getAllTask(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $task = Task::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($task->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Task. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());
                $task = Task::where('status', $request->query('status'))
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $taskCount = Task::where('status', $request->query('status'))
                    ->count();

                $converted = arrayKeysToCamelCase($task->toArray());
                $finalResult = [
                    'getAllTask' => $converted,
                    'totalTask' => $taskCount,
                ];

                return response()->json($finalResult);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Task. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query'], 400);
        }
    }

    //get single task
    public function getSingleTask($id): JsonResponse
    {
        try {
            $task = Task::with('project', 'milestone', 'priority', 'taskStatus')->where('id', $id)->first();
            if (!$task) {
                return response()->json(['error' => 'Task not found'], 404);
            }

            $converted = arrayKeysToCamelCase($task->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Task. Please try again later.'], 500);
        }
    }

    //update task
    public function updateTask(Request $request, $id): JsonResponse
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return response()->json(['error' => 'Task not found'], 404);
            }
            $task->update($request->all());
            $converted = arrayKeysToCamelCase($task->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating Task. Please try again later.'], 500);
        }
    }

    //delete task
    public function deleteTask($id): JsonResponse
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return response()->json(['error' => 'Task not found'], 404);
            }
            $task->delete();

            return response()->json(['message' => 'Task deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting Task. Please try again later.'], 500);
        }
    }
}
