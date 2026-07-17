<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogGeneratorService
{
    public function __construct(private OpenAIService $openAI) {}

    /**
     * Génère et enregistre un article.
     *
     * @param string $topic
     * @return Blog
     * @throws \Exception
     */
    public function generateAndSave(string $topic): Blog
    {
        // 1. Appel OpenAI
        $articleData = $this->openAI->generateArticle($topic);

        // 2. Validation des données
        $validator = Validator::make($articleData, [
            'title'   => 'required|string|min:5|max:150',
            'excerpt' => 'required|string|min:10|max:500',
            'content' => 'required|string|min:100',
            'image'   => 'nullable|url',
        ]);

        if ($validator->fails()) {
            Log::error('Données article invalides', [
                'errors' => $validator->errors()->toArray(),
                'topic'  => $topic,
            ]);
            throw new \Exception('Validation article échouée : ' . $validator->errors()->first());
        }

        // 3. Vérifier l'unicité du titre
        $existingTitle = Blog::where('title', $articleData['title'])->exists();
        if ($existingTitle) {
            Log::warning('Titre déjà existant, génération annulée', ['title' => $articleData['title']]);
            throw new \Exception("Un article avec le titre \"{$articleData['title']}\" existe déjà.");
        }

        // 4. Génération du slug unique
        $slug = Str::slug($articleData['title']);
        $originalSlug = $slug;
        $counter = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter++;
        }

        // 5. Sauvegarde
        $blog = Blog::create([
            'title'   => $articleData['title'],
            'slug'    => $slug,
            'excerpt' => $articleData['excerpt'],
            'content' => $articleData['content'],
            'image'   => $articleData['image'],
            'status'  => 'published', // ou 'draft' selon le besoin
        ]);

        Log::info('Article généré et enregistré', [
            'id'    => $blog->id,
            'title' => $blog->title,
        ]);

        return $blog;
    }
}