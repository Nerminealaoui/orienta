<?php

// app/Http/Controllers/Api/AuthController.php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request) {
        
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user->only(['id', 'first_name', 'last_name', 'email', 'role', 'status'])
        ]);
    }

public function register(Request $request)
{
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name'  => 'required|string|max:255',
        'phone'      => 'nullable|string|max:20',
        'education_level' => 'nullable|string',
        'email'      => 'required|email|unique:users,email',
        'password' => 'required|string|min:6|confirmed',
    ]);

    $user = User::create([
        'first_name' => $validated['first_name'],
        'last_name'  => $validated['last_name'],
        'name'       => $validated['first_name'].' '.$validated['last_name'],
        'email'      => $validated['email'],
        'password'   => Hash::make($validated['password']),
        'role'       => 'student',
    ]);

    $token = $user->createToken('auth-token')->plainTextToken;

    return response()->json([
        'message' => 'Compte créé avec succès',
        'token'   => $token,
        'user'    => $user
    ], 201);
}

public function adminLogin(Request $request)
{
    dd($user);
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Email ou mot de passe incorrect.'
        ], 401);
    }

    if (!in_array($user->role, ['admin', 'super_admin'])) {
        return response()->json([
            'message' => 'Accès refusé.'
        ], 403);
    }

    $token = $user->createToken('admin-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
        ]
    ]);
}


    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }
}