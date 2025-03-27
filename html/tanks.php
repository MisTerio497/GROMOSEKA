<?php
// Путь к JSON-файлу
$jsonFile = 'data.json';

// Чтение содержимого файла
$jsonData = file_get_contents($jsonFile);

// Декодирование JSON в ассоциативный массив PHP
$tank = json_decode($jsonData, true);

// Проверка на ошибки декодирования
if (json_last_error() !== JSON_ERROR_NONE) {
    die('Ошибка парсинга JSON: ' . json_last_error_msg());
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Поиск</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
      <nav class="searchPage">
        <a href="/" class="header_link">Главная</a>
        <a href="tanks.html" class="header_link">Танки</a>
        <a href="/search" class="header_link" id="line2">Поиск</a>
      </nav>
    </header>
    <h1><?= $tank['nametank'] ?></h1>

    <!-- Изображение танка -->
    <img src= "<?= $tank['images_url']?>" alt="<?= $tank['nametank'] ?>" width="400">

    <h2>Описание</h2>
    <p><?= $tank['description'] ?></p>

    <h2>Характеристики</h2>
    <table border="1">
        <tr>
            <th>Экипаж</th>
            <td><?= $tank['team'] ?></td>
        </tr>
        <tr>
            <th>Бронирование корпуса</th>
            <td><?= $tank['hull_armor'] ?></td>
        </tr>
        <tr>
            <th>Бронирование башни</th>
            <td><?= $tank['tower_armor'] ?></td>
        </tr>
        <tr>
            <th>Мобильность</th>
            <td><?= $tank['mobility'] ?></td>
        </tr>
    </table>
</body>
</html>