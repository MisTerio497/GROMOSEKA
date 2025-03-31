FROM php:8.4-fpm

WORKDIR /var/www/html/api

COPY . .

# Устанавливаем зависимости и драйверы
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Устанавливаем зависимости PHP через Composer
RUN composer install
