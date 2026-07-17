<?php
// app/Http/Controllers/Api/ContactController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;


class ContactController extends Controller
{
    public function index() {
        return response()->json(ContactMessage::orderBy('is_read', 'asc')->orderBy('created_at', 'desc')->get());
    }

    public function markAsRead(ContactMessage $contactMessage) {
        $contactMessage->update(['is_read' => true]);
        return response()->json($contactMessage);
    }

    public function reply(Request $request, ContactMessage $contactMessage) {
        $validated = $request->validate([
            'reply_content' => 'required|string',
        ]);

        // Envoyer email de réponse si souhaité
        // Mail::to($contactMessage->email)->send(...);

        $contactMessage->update([
            'is_replied'    => true,
            'replied_at'    => now(),
            'reply_content' => $validated['reply_content'],
        ]);

        return response()->json($contactMessage);
    }

    public function destroy(ContactMessage $contactMessage) {
        $contactMessage->delete();
        return response()->json(['message' => 'Message supprimé.']);
    }
}