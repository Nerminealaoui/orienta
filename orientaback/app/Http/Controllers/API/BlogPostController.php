<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => BlogPost::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|integer',
            'author_id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|string',
        ]);

        $blogPost = BlogPost::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog post created successfully',
            'data' => $blogPost
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => BlogPost::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $blogPost = BlogPost::findOrFail($id);

        $blogPost->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Blog post updated successfully',
            'data' => $blogPost
        ]);
    }

    public function destroy($id)
    {
        BlogPost::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Blog post deleted successfully'
        ]);
    }
}