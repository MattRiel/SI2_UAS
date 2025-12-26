# SI2 UAS Modernization Project

This project is a modernization of the **SI2_UAS** Library Management System. It has been transformed from a legacy CodeIgniter 3 application into a modern, containerized full-stack application.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React, Axios.
- **Backend**: Laravel 12 (API-only), Sanctum Auth, Service-Repository Pattern.
- **Infrastructure**: Docker Compose, Nginx, MariaDB, Redis (Caching/Sessions), MinIO (S3 Storage).

## 📁 Project Structure

- `/api`: Laravel 12 Backend API.
- `/web`: Next.js 14 Frontend Application.
- `/legacy`: Preserved original CodeIgniter 3 codebase for reference.
- `/docker`: Custom Dockerfiles and configuration files.

## 🛠️ Getting Started

### Prerequisites
- Docker & Docker Compose installed.

### Installation
1. Clone the repository.
2. Run the stack:
   ```bash
   docker-compose up -d
   ```
3. Initialize the database (first time only):
   ```bash
   docker-compose exec api php artisan migrate --seed
   ```

## 🌐 Accessing the App

- **Frontend**: [http://localhost](http://localhost)
- **Admin Dashboard**: [http://localhost/dashboard](http://localhost/dashboard)
- **MinIO Console (Storage)**: [http://localhost:9001](http://localhost:9001) (admin/password)
- **Backend API**: [http://localhost/api](http://localhost/api)
- **Telescope (Debug)**: [http://localhost/telescope](http://localhost/telescope)

## 🛠️ Development Tools

This project is optimized for **Development Only**:

### 🔍 Laravel Telescope
Access [http://localhost/telescope](http://localhost/telescope) to inspect:
- Every database query.
- API requests and payloads.
- Authentication attempts.
- Application logs.
- Exceptions/Errors in detail.

### ⚡ Rapid Feedback
- **PHP OPcache**: Configured for `revalidate_freq=0`, meaning PHP files are checked for changes on every request.
- **Hot Reloading**: Next.js is running in `dev` mode with Fast Refresh enabled.
- **Detailed Errors**: `APP_DEBUG=true` is enabled in the backend for full stack traces.

### 🔑 Test Credentials (Admin)
- **Username**: `ariel`
- **Password**: `password`

## ⚡ Features
- **Glassmorphism UI**: Modern and premium aesthetic.
- **Micro-service Ready**: Decoupled frontend and backend.
- **Object Storage**: Direct integration with MinIO (S3-compatible) for gallery images.
- **Caching**: Redis integration for high-speed data retrieval.
- **Containerized**: Consistent development and production environments.
