<?php

namespace App\Services;

use App\Models\Image as ImageModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function getAllImages()
    {
        return ImageModel::all();
    }

    public function uploadImage(UploadedFile $file, string $description)
    {
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
        Storage::disk('s3')->delete($image->filename);
        return $image->delete();
    }
}
