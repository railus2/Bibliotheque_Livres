<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Récupérer toutes les notifications d'un utilisateur.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Créer une nouvelle notification.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        return Notification::create($request->all());
    }

    /**
     * Marquer une notification comme lue.
     */
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['is_read' => 1]);

        return response()->json(['message' => 'Notification marked as read.']);
    }

    /**
     * Supprimer une notification.
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}