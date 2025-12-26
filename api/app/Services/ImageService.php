<?php

namespace App\Services;

use App\Models\Image as ImageModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Cache;

class ImageService
{
    public function getAllImages()
    {
        return Cache::remember('all_images', 3600, function () {
            return ImageModel::all();
        });
    }

    public function uploadImage(UploadedFile $file, string $description)
    {
        Cache::forget('all_images');
        Cache::forget('dashboard_stats');
        $path = $file->store('gallery', 's3');

        return ImageModel::create([
            'description' => $description,
            'filename' => $path,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ]);
    }

    public function deleteImage(ImageModel $image)
    {
        Cache::forget('all_images');
        Cache::forget('dashboard_stats');
        Storage::disk('s3')->delete($image->filename);
        return $image->delete();
    }
}
