<?php

namespace App\Console\Commands;

use App\Services\BlogGeneratorService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class BlogGenerateCommand extends Command
{
    protected $signature = 'blog:generate
                            {--count=4 : Nombre d’articles à générer}
                            {--topic= : Sujet imposé (sinon aléatoire)}';
    protected $description = 'Génère automatiquement des articles de blog via OpenAI';

    // Liste de sujets éducatifs (à enrichir)
    private array $topics = [
        'Les méthodes pédagogiques innovantes',
        'L’impact de l’intelligence artificielle en éducation',
        'Comment motiver les élèves en classe',
        'L’apprentissage par projet : avantages et mise en place',
        'La classe inversée : retour d’expérience',
        'Les bienfaits de la lecture chez les jeunes',
        'Éduquer à la citoyenneté numérique',
        'Stratégies pour lutter contre le décrochage scolaire',
        'L’évaluation formative : un levier pour la réussite',
        'Utilisation des podcasts en formation',
        'Enseigner avec le jeu : pédagogie ludique',
        'Le mentorat étudiant : clés de succès',
    ];

    public function handle(BlogGeneratorService $generator): int
    {
        $count = (int) $this->option('count');
        $topic = $this->option('topic');

        $this->info("Génération de {$count} article(s)...");
        Log::info("Commande blog:generate démarrée", ['count' => $count, 'topic' => $topic]);

        $success = 0;
        for ($i = 0; $i < $count; $i++) {
            try {
                $currentTopic = $topic ?? $this->getRandomTopic();
                $this->line(" - Sujet : {$currentTopic}");

                $blog = $generator->generateAndSave($currentTopic);
                $this->info("   ✓ Article créé (ID: {$blog->id}) : {$blog->title}");
                $success++;
            } catch (\Exception $e) {
                $this->error("   ✗ Erreur : " . $e->getMessage());
                Log::error('Échec génération article', [
                    'topic' => $currentTopic ?? 'inconnu',
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $this->info("{$success}/{$count} articles générés avec succès.");
        Log::info("Commande blog:generate terminée", ['success' => $success, 'total' => $count]);

        return $success === $count ? Command::SUCCESS : Command::FAILURE;
    }

    private function getRandomTopic(): string
    {
        return $this->topics[array_rand($this->topics)];
    }
}