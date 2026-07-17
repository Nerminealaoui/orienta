<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OrientationController extends Controller
{
    public function recommander(Request $request)
    {
        $prompt = $request->input('prompt');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'HTTP-Referer'  => env('APP_URL'),
            'X-Title'       => 'Orientation Maroc',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model'    => 'anthropic/claude-3.5-haiku',
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
            'max_tokens' => 800,
        ]);

        return response()->json($response->json());
    }
}