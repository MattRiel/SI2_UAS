<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Default Admins from si2_uas.sql
        $admins = [
            ['username' => 'ariel', 'password' => 'password'],
            ['username' => 'traxforce', 'password' => 'password'],
        ];

        foreach ($admins as $admin) {
            User::updateOrCreate(
                ['username' => $admin['username']],
                [
                    'password' => Hash::make($admin['password']),
                    'role' => 'admin',
                ]
            );
        }

        // Default Guests
        $guests = [
            ['username' => 'roberto', 'password' => 'password'],
            ['username' => 'anto', 'password' => 'password'],
        ];

        foreach ($guests as $guest) {
            User::updateOrCreate(
                ['username' => $guest['username']],
                [
                    'password' => Hash::make($guest['password']),
                    'role' => 'guest',
                ]
            );
        }

        // Seed some sample books
        Book::create(['title' => 'Cerdas Tidak Cermat', 'author' => 'Biggus Cardian']);
        Book::create(['title' => 'Pemilik Sertifikat Dunia', 'author' => 'Sunda Empire']);
    }
}
