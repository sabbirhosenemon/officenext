<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FolderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('permission:create-fileManager')->post('/', [FolderController::class, 'createFolder']);
Route::middleware('permission:readAll-fileManager')->get('/', [FolderController::class, 'getAllFolder']);
Route::middleware('permission:readSingle-fileManager')->get('/{id}', [FolderController::class, 'getSingleFolder']);
Route::middleware('permission:update-fileManager')->put('/{id}', [FolderController::class, 'updateSingleFolder']);
Route::middleware('permission:delete-fileManager')->delete('/{id}', [FolderController::class, 'deleteSingleFolder']);

Route::middleware('permission:readSingle-fileManager')->get('/directory/{id}', [FolderController::class, 'getFolderDirectory']);
