```
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { LucideImage, LucidePlus, LucideLoader2, LucideTrash2 } from "lucide-react";
import ImageModal from "@/components/ImageModal";

interface GalleryImage {
  id: number;
  description: string;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost/api/images");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (formData: FormData) => {
    try {
      await axios.post("http://localhost/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchImages();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`http://localhost/api/images/${id}`);
fetchImages();
      } catch (err) {
    console.error("Delete failed", err);
}
    }
  };

return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold">Image Gallery</h2>
                <p className="text-slate-400">A visual collection of library assets.</p>
            </div>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors shadow-lg shadow-purple-500/20 active:scale-95"
            >
                <LucidePlus className="w-5 h-5 mr-2" />
                Upload Image
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <LucideLoader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map(img => (
                    <div key={img.id} className="group relative aspect-square bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all">
                        <img
                            src={img.url}
                            alt={img.description}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                            <div className="flex justify-between items-end">
                                <div className="flex-1 min-w-0 mr-4">
                                    <p className="text-sm font-bold truncate">{img.description}</p>
                                    <p className="text-xs text-slate-400">{(img.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="p-2 bg-red-500/20 hover:bg-red-500 rounded-lg text-red-400 hover:text-white transition-all shadow-lg"
                                >
                                    <LucideTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                        <p className="text-slate-500 italic">Gallery is empty.</p>
                    </div>
                )}
            </div>
        )}

        <ImageModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleUpload}
        />
    </div>
);
}
```
