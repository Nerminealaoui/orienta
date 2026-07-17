<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Course::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'youtube_url' => 'required|string',
            'youtube_video_id' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'language' => 'nullable|string|max:100',
            'level' => 'nullable|string|max:100',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully',
            'data' => $course
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Course::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $course->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course
        ]);
    }

    public function destroy($id)
    {
        Course::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }
}