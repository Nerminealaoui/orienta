<?php
namespace App\Http\Controllers\API;   // ← majuscule

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class StudentProfileController extends Controller
{
    public function index() {
        $students = User::with(['profile.languages', 'profile.softSkills'])   // ✅ correct
                        ->where('role', 'student')
                        ->get();
        return response()->json($students);
    }

    public function show(User $user) {
        if ($user->role !== 'student') {
            return response()->json(['message' => 'Cet utilisateur n\'est pas un étudiant.'], 404);
        }
        return response()->json($user->load(['profile.languages', 'profile.softSkills']));
    }

    public function updateProfile(Request $request, User $user) {
        if ($user->role !== 'student') {
            return response()->json(['message' => 'Cet utilisateur n\'est pas un étudiant.'], 404);
        }

        $validated = $request->validate([
            'level'          => 'nullable|string',
            'field_of_study' => 'nullable|string',
            'birth_date'     => 'nullable|date',
            'phone'          => 'nullable|string',
            'bio'            => 'nullable|string',
            'language_ids'   => 'nullable|array',
            'language_ids.*' => 'exists:languages,id',
            'soft_skill_ids' => 'nullable|array',
            'soft_skill_ids.*' => 'exists:soft_skills,id',
        ]);

        $profile = $user->profile;
        if (!$profile) {
            $profile = $user->profile()->create($validated);
        } else {
            $profile->update($validated);
        }

        if (isset($validated['language_ids'])) {
            $profile->languages()->sync($validated['language_ids']);
        }
        if (isset($validated['soft_skill_ids'])) {
            $profile->softSkills()->sync($validated['soft_skill_ids']);
        }

        return response()->json($user->load(['profile.languages', 'profile.softSkills']));
    }

    public function destroy(User $user) {
        if ($user->role !== 'student') {
            return response()->json(['message' => 'Cet utilisateur n\'est pas un étudiant.'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'Étudiant supprimé.']);
    }
}