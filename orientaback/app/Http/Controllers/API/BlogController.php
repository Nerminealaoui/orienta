<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $blogs = Blog::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Cache::remember("blog.{$slug}", 3600, function () use ($slug) {
            return Blog::where('slug', $slug)
                ->where('status', 'published')
                ->first();
        });

        if (!$blog) {
            return response()->json(['message' => 'Article introuvable'], 404);
        }

        return response()->json($blog);
    }
}