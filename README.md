# GROMOSEKA
HAKATON site

## Описание
Чтобы запустить проект, выполните следующие шаги:

1. Клонируйте репозиторий:
   ```
   git clone https://github.com/.../GROMOSEKA.git
   ```

2. Перейдите в директорию проекта:
   ```
   cd GROMOSEKA
   ```
3. Скачиваем Docker:
   ```
   windows:
   https://docs.docker.com/desktop/setup/install/windows-install/
   Это инструкция
   ```
4. Запустите контейнер docker:
   ```
   docker-compose up -d --build
   
   -d - этот флаг обозначает запуск контейнера в фоновом режиме
   ```
5. Копируем базу данных из файла 'dump.sql'
   ```
   docker-compose exec db pg_dump -U postgres -d tanks -f /tmp/dump.sql
   docker-compose cp db:/tmp/dump.sql ./dump.sql
   
   docker-compose cp ./dump.sql db:/tmp/dump.sql
   docker-compose exec db psql -U postgres -d tanks -f /tmp/dump.sql
   ```
6. Проект ломается пишите мне.
