"use client";

import { LucideBook, LucideUser, LucideTrash2, LucideEdit } from "lucide-react";

interface Book {
    id: number;
    title: string;
    author: string;
}

interface BookCardProps {
    book: Book;
    onDelete?: (id: number) => void;
    onEdit?: (book: Book) => void;
    isAdmin?: boolean;
}

export default function BookCard({ book, onDelete, onEdit, isAdmin }: BookCardProps) {
    return (
        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all group backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/10 p-3 rounded-xl">
                    <LucideBook className="w-6 h-6 text-blue-400" />
                </div>
                {isAdmin && (
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit?.(book)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <LucideEdit className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete?.(book.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors">
                            <LucideTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            <h3 className="text-xl font-bold mb-1 truncate">{book.title}</h3>
            <div className="flex items-center text-slate-400 text-sm">
                <LucideUser className="w-4 h-4 mr-2" />
                <span>{book.author}</span>
            </div>
        </div>
    );
}
