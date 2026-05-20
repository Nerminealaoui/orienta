<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Scholarship;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Scholarship::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'scholarship_category_id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'application_url' => 'nullable|string',
        ]);

        $scholarship = Scholarship::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Scholarship created successfully',
            'data' => $scholarship
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Scholarship::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $scholarship = Scholarship::findOrFail($id);

        $scholarship->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Scholarship updated successfully',
            'data' => $scholarship
        ]);
    }

    public function destroy($id)
    {
        Scholarship::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Scholarship deleted successfully'
        ]);
    }
}