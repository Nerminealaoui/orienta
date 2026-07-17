<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    private string $apiKey;
    private string $apiBase;
    private string $model;
    private int $maxTokens;
    private float $temperature;

    public function __construct()
    {
        $this->apiKey      = config('services.openai.api_key');   // 'api_key' et non 'key'
        $this->apiBase     = config('services.openai.api_base');
        $this->model       = config('services.openai.model');
        $this->maxTokens   = config('services.openai.max_tokens');
        $this->temperature = config('services.openai.temperature');
    }

    public function generateArticle(string $topic): array
    {
        $prompt = <<<PROMPT
Tu es un rédacteur expert en éducation et pédagogie. Rédige un article de blog structuré en français sur le sujet suivant : "{$topic}".

Renvoie **uniquement** un objet JSON valide (sans aucun autre texte avant ou après) contenant les clés :
- "title" : un titre accrocheur (max 100 caractères),
- "excerpt" : un résumé de l'article (max 300 caractères),
- "content" : le contenu complet de l'article au format HTML (h1, p, ul, blockquote, etc.),
- "image" : null.

Important : le contenu doit être informatif, bien structuré et faire entre 800 et 1500 mots.
PROMPT;

        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'HTTP-Referer'  => config('app.url', 'http://localhost'),
                    'X-Title'       => config('app.name', 'Laravel'),
                ])
                ->post($this->apiBase . '/chat/completions', [
                    'model'       => $this->model,
                    'messages'    => [
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'max_tokens'  => $this->maxTokens,
                    'temperature' => $this->temperature,
                ]);

            if ($response->failed()) {
                Log::error('API error', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                throw new \Exception('API request failed: ' . $response->body());
            }

            $json   = $response->json();
            $answer = $json['choices'][0]['message']['content'] ?? null;

            if (empty($answer)) {
                throw new \Exception('Réponse vide de l’API');
            }

            $answer = trim($answer);
            if (str_starts_with($answer, '```json')) {
                $answer = substr($answer, 7);
                $answer = substr($answer, 0, -3);
            }

            $data = json_decode($answer, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('JSON invalide', ['raw' => $answer]);
                throw new \Exception('La réponse n’est pas un JSON valide');
            }

            return [
                'title'   => $data['title'] ?? '',
                'excerpt' => $data['excerpt'] ?? '',
                'content' => $data['content'] ?? '',
                'image'   => $data['image'] ?? null,
            ];

        } catch (\Exception $e) {
            Log::error('Erreur OpenAIService', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}