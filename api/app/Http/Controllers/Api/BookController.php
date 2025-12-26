<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function index()
    {
        return response()->json($this->bookService->getAllBooks());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
        ]);

        $book = $this->bookService->createBook($request->all());

        return response()->json($book, 201);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'string|max:255',
            'author' => 'string|max:255',
        ]);

        $book = $this->bookService->updateBook($book, $request->all());

        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        $this->bookService->deleteBook($book);

        return response()->json(['message' => 'Book deleted successfully']);
    }
}
