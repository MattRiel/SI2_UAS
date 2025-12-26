#!/bin/bash
set -e

if [ ! -f "artisan" ]; then
    echo "Initializing Laravel..."
    composer create-project laravel/laravel . --quiet
    chown -R www-data:www-data /var/www/api
fi

exec "$@"
