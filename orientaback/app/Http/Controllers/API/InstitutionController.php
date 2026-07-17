<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    public function index()
    {
        return Institution::all();
    }

    public function store(Request $request)
    {
        return Institution::create($request->all());
    }

    public function show($id)
    {
        return Institution::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::findOrFail($id);

        $institution->update($request->all());

        return $institution;
    }

    public function destroy($id)
    {
        Institution::destroy($id);

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}