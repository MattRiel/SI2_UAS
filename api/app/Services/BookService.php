<?php

namespace App\Services;

use App\Models\Book;
use App\Repositories\BookRepository;

class BookService
{
    protected $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function getAllBooks()
    {
        return $this->bookRepository->all();
    }

    public function createBook(array $data)
    {
        return $this->bookRepository->create($data);
    }

    public function updateBook(Book $book, array $data)
    {
        return $this->bookRepository->update($book, $data);
    }

    public function deleteBook(Book $book)
    {
        return $this->bookRepository->delete($book);
    }
}
