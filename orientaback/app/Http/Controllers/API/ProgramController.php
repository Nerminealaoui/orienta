<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class ProgramController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Program::latest()->get()
        ]);
    }

 public function store(Request $request)
    {
        $validated = $request->validate([
            'program_category_id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'duration_years' => 'nullable|integer',
            'degree_level' => 'nullable|string|max:255',
            'required_bac' => 'nullable|string|max:255',
        ]);

        $validated['slug'] =
            Str::slug($validated['name']) . '-' . time();

        $program = Program::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Program created successfully',
            'data' => $program
        ], 201);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Program::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $program->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Program updated successfully',
            'data' => $program
        ]);
    }

    public function destroy($id)
    {
        Program::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Program deleted successfully'
        ]);
    }
}