<?php

namespace App\Repositories;

use App\Models\Book;

class BookRepository
{
    public function all()
    {
        return Book::all();
    }

    public function create(array $data)
    {
        return Book::create($data);
    }

    public function find($id)
    {
        return Book::findOrFail($id);
    }

    public function update(Book $book, array $data)
    {
        $book->update($data);
        return $book;
    }

    public function delete(Book $book)
    {
        return $book->delete();
    }
}
