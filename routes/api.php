<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SurveyInterviewController;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Survey interview records
Route::prefix('interviews')->group(function () {
    Route::get('/', [SurveyInterviewController::class, 'index']);
    Route::get('/{id}', [SurveyInterviewController::class, 'show']);
    Route::post('/', [SurveyInterviewController::class, 'store']);
});
