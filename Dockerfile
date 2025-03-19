FROM php:8.0-fpm

# Устанавливаем зависимости и драйверы
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Копируем файлы и настраиваем права доступа
COPY ./html /var/www/html