<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\BlogPostController;
use App\Http\Controllers\API\ScholarshipController;
use App\Http\Controllers\API\AuthController;


Route::apiResource('institutions', InstitutionController::class);
Route::apiResource('programs', ProgramController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('blog-posts', BlogPostController::class);
Route::apiResource('scholarships', ScholarshipController::class);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);