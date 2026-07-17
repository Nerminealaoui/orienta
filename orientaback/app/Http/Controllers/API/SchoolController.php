<?php
// app/Http/Controllers/Api/SchoolController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index() {
        return response()->json(School::all());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'address'     => 'nullable|string',
            'phone'       => 'nullable|string',
            'email'       => 'nullable|email',
            'description' => 'nullable|string',
        ]);
        return response()->json(School::create($validated), 201);
    }

    public function show(School $school) {
        return response()->json($school);
    }

    public function update(Request $request, School $school) {
        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'address'     => 'nullable|string',
            'phone'       => 'nullable|string',
            'email'       => 'nullable|email',
            'description' => 'nullable|string',
        ]);
        $school->update($validated);
        return response()->json($school);
    }

    public function destroy(School $school) {
        $school->delete();
        return response()->json(['message' => 'École supprimée.']);
    }
}
