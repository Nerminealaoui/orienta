<?php 

// app/Http/Controllers/Api/UserController.php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request) {
        $query = User::query();
        if ($request->has('role') && in_array($request->role, ['super_admin', 'admin', 'student'])) {
            $query->where('role', $request->role);
        }
        return response()->json($query->with('profile')->get());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
            'role'       => ['required', Rule::in(['super_admin', 'admin', 'student'])],
            'status'     => 'sometimes|boolean',
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name'  => $validated['last_name'],
            'name'       => $validated['first_name'] . ' ' . $validated['last_name'],
            'email'      => $validated['email'],
            'password'   => Hash::make($validated['password']),
            'role'       => $validated['role'],
            'status'     => $validated['status'] ?? 1,
        ]);

        if ($user->role === 'student') {
            $user->profile()->create([]);
        }

        return response()->json($user, 201);
    }

    public function show(User $user) {
        return response()->json($user->load('profile'));
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name'  => 'sometimes|string|max:255',
            'email'      => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'password'   => 'sometimes|min:8|nullable',
            'role'       => ['sometimes', Rule::in(['super_admin', 'admin', 'student'])],
            'status'     => 'sometimes|boolean',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        if (isset($validated['first_name']) || isset($validated['last_name'])) {
            $user->name = ($validated['first_name'] ?? $user->first_name) . ' ' . ($validated['last_name'] ?? $user->last_name);
        }

        $user->update($validated);
        return response()->json($user);
    }

    public function destroy(User $user) {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer votre propre compte.'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé.']);
    }
}