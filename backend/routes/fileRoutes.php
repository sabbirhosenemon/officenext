<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
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

Route::middleware('permission:create-fileManager')->post('/', [FileController::class, 'create']);
Route::middleware('permission:readAll-fileManager')->get('/byFolderId/{id}', [FileController::class, 'getFilesByFolderId']);
Route::middleware('permission:readAll-fileManager')->get('/home', [FileController::class, 'getFolderLessFiles']);

Route::middleware('permission:delete-fileManager')->delete('/{id}', [FileController::class, 'deleteFile']);
Route::middleware('permission:readSingle-fileManager')->get('/download/{id}', [FileController::class, 'downloadFile']);
