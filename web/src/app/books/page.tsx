"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import BookCard from "../../components/BookCard";
import BookModal from "../../components/BookModal";
import { LucidePlus, LucideLoader2 } from "lucide-react";

interface Book {
    id: number;
    title: string;
    author: string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await api.get("/books");
            setBooks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAdd = async (data: any) => {
        try {
            await api.post("/books", data);
            console.log("Book added successfully!"); // Mock toast
            setModalOpen(false);
            fetchBooks();
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    const handleUpdate = async (data: any) => {
        if (!editingBook) return;
        try {
            await api.put(`/books/${editingBook.id}`, data);
            console.log("Book updated successfully!"); // Mock toast
            setModalOpen(false);
            setEditingBook(null);
            fetchBooks();
        } catch (err) {
            console.error("Error updating book:", err);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this book?")) {
            try {
                await api.delete(`/books/${id}`);
                console.log("Book deleted successfully!"); // Mock toast
                fetchBooks();
            } catch (err) {
                console.error("Error deleting book:", err);
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Book Catalog</h2>
                    <p className="text-slate-400">Manage and browse the library collection.</p>
                </div>
                <button
                    onClick={() => { setEditingBook(null); setModalOpen(true); }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <LucidePlus className="w-5 h-5 mr-2" />
                    Add New Book
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <LucideLoader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            isAdmin={true}
                            onDelete={handleDelete}
                            onEdit={(b) => { setEditingBook(b); setModalOpen(true); }}
                        />
                    ))}
                    {books.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                            <p className="text-slate-500 italic">No books found in the collection.</p>
                        </div>
                    )}
                </div>
            )}

            {modalOpen && (
                <BookModal
                    isOpen={modalOpen}
                    onClose={() => { setModalOpen(false); setEditingBook(null); }}
                    onSubmit={editingBook ? handleUpdate : handleAdd}
                    initialData={editingBook || undefined}
                    title={editingBook ? "Edit Book" : "Add New Book"}
                />
            )}
        </div>
    );
}
