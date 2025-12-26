"use client";

import { useState } from "react";
import { LucideX, LucideLoader2, LucideUpload, LucideImage } from "lucide-react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

export default function ImageModal({ isOpen, onClose, onSubmit }: ImageModalProps) {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);

        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                    <h3 className="text-xl font-bold">Upload Gallery Image</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <LucideX className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div
                            className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-colors ${preview ? 'border-blue-500/50' : 'border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setFile(null); setPreview(null); }}
                                        className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-red-500 rounded-full transition-colors"
                                    >
                                        <LucideX className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <LucideUpload className="w-8 h-8 text-slate-500 mb-2" />
                                    <span className="text-sm font-medium text-slate-400">Click to upload</span>
                                    <span className="text-xs text-slate-600 mt-1">PNG, JPG up to 10MB</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                                </label>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-colors min-h-[100px]"
                                placeholder="Give this image a description..."
                                required
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !file}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
                        >
                            {loading ? <LucideLoader2 className="w-5 h-5 animate-spin" /> : "Upload Image"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
