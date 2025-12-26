<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        return response()->json($this->imageService->getAllImages());
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string',
            'image' => 'required|image|max:10240',
        ]);

        $image = $this->imageService->uploadImage($request->file('image'), $request->description);

        return response()->json($image, 201);
    }

    public function destroy(Image $image)
    {
        $this->imageService->deleteImage($image);

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
