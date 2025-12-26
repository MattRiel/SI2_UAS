"use client";

import { useState } from "react";
import { LucideX, LucideLoader2 } from "lucide-react";

interface Book {
    id?: number;
    title: string;
    author: string;
}

interface BookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Book) => Promise<void>;
    initialData?: Book;
    title: string;
}

export default function BookModal({ isOpen, onClose, onSubmit, initialData, title }: BookModalProps) {
    const [formData, setFormData] = useState<Book>(initialData || { title: "", author: "" });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <LucideX className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Book Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-colors"
                            placeholder="e.g. Clean Code"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Author Name</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-colors"
                            placeholder="e.g. Robert C. Martin"
                            required
                        />
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
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
                        >
                            {loading ? <LucideLoader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
