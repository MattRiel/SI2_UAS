<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;

class StatsController extends Controller
{
    public function index()
    {
        $stats = Cache::remember('dashboard_stats', 60, function () {
            return [
                'books' => Book::count(),
                'images' => Image::count(),
                'users' => User::count(),
            ];
        });

        return response()->json($stats);
    }
}
