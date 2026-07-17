<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;
use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\BlogPostController;
use App\Http\Controllers\API\ScholarshipController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\OrientationController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\StudentProfileController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SchoolController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\ContactController;


Route::apiResource('institutions', InstitutionController::class);
Route::apiResource('programs', ProgramController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('blog-posts', BlogPostController::class);
Route::apiResource('scholarships', ScholarshipController::class);

Route::apiResource('student-profiles', StudentProfileController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/recommander', [OrientationController::class, 'recommander']);

Route::get('blogs', [BlogController::class, 'index']);
Route::get('blogs/{slug}', [BlogController::class, 'show']);

//Route::post('/login', [AuthController::class, 'login']);
//Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
//Route::apiResource('users', UserController::class);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);          // Student
Route::post('/admin/login', [AuthController::class, 'adminLogin']); // Admin

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('schools', SchoolController::class);});

    Route::get('students', [StudentProfileController::class, 'index']);
    Route::get('students/{user}', [StudentProfileController::class, 'show']);
    Route::put('students/{user}/profile', [StudentProfileController::class, 'updateProfile']);
    Route::delete('students/{user}', [StudentProfileController::class, 'destroy']);

    Route::get('contacts', [ContactController::class, 'index']);
    Route::patch('contacts/{contactMessage}/read', [ContactController::class, 'markAsRead']);
    Route::post('contacts/{contactMessage}/reply', [ContactController::class, 'reply']);
    Route::delete('contacts/{contactMessage}', [ContactController::class, 'destroy']);