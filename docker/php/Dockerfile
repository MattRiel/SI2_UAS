FROM php:8.2-fpm-alpine

# Install essential system dependencies
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    libzip-dev \
    icu-dev \
    bash

# Use the mlocati/php-extension-installer for more reliable installation
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pcntl bcmath pdo_mysql zip intl gd redis opcache

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/api

# Create a shell script to initialize Laravel if directory is empty
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Standardize permissions
RUN chown -R www-data:www-data /var/www/api

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
