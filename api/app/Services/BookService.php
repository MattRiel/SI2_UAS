<?php

namespace App\Services;

use App\Models\Book;
use App\Repositories\BookRepository;

use Illuminate\Support\Facades\Cache;

class BookService
{
    protected $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function getAllBooks()
    {
        return Cache::remember('all_books', 3600, function () {
            return $this->bookRepository->all();
        });
    }

    public function createBook(array $data)
    {
        Cache::forget('all_books');
        Cache::forget('dashboard_stats');
        return $this->bookRepository->create($data);
    }

    public function updateBook(Book $book, array $data)
    {
        Cache::forget('all_books');
        return $this->bookRepository->update($book, $data);
    }

    public function deleteBook(Book $book)
    {
        Cache::forget('all_books');
        Cache::forget('dashboard_stats');
        return $this->bookRepository->delete($book);
    }
}
