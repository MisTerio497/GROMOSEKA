# Используем официальный образ Python
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /flask_app

# Копируем зависимости в контейнер
COPY requirements.txt /flask_app

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы приложения в контейнер
COPY . /flask_app

