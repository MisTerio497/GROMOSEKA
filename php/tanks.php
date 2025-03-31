<?php
header('Content-Type: text/html; charset=utf-8');
$pdo = require_once "data.conf.php";
$id = $_GET['id'] ?? null;

// Проверка ID до любого HTML-вывода
if (!$id) {
    http_response_code(400);
    die('<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Ошибка</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <header>
            <nav class="searchPage">
                <a href="/" class="header_link">Главная</a>
                <a href="/tank" class="header_link">Танки</a>
                <a href="/search" class="header_link" id="line2">Поиск</a>
            </nav>
        </header>
        <h1>Ошибка 400</h1>
        <p>Не указан ID танка</p>
    </body>
    </html>');
}

// Используем подготовленные выражения для безопасности
$stmt = $pdo->prepare("SELECT * FROM tanks WHERE id = :id");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();

$tank = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$tank) {
    http_response_code(404);
    die('<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Танк не найден</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <header>
            <nav class="searchPage">
                <a href="/" class="header_link">Главная</a>
                <a href="/tank" class="header_link">Танки</a>
                <a href="/search" class="header_link" id="line2">Поиск</a>
            </nav>
        </header>
        <h1>Ошибка 404</h1>
        <p>Танк с указанным ID не найден</p>
    </body>
    </html>');
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($tank['nametank']) ?></title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</head>
<body>
<header>
    <nav class="searchPage">
        <a href="/" class="header_link">Главная</a>
        <a href="/tank" class="header_link">Танки</a>
        <a href="/search" class="header_link" id="line2">Поиск</a>
    </nav>
</header>

<h1><?= htmlspecialchars($tank['nametank']) ?></h1>

<img src="<?= htmlspecialchars($tank['images_url']) ?>" alt="<?= htmlspecialchars($tank['nametank']) ?>" width="400">

<h2>Описание</h2>
<p><?= htmlspecialchars($tank['description']) ?></p>

<h2>Характеристики</h2>
<table border="1">
    <tr>
        <th>Экипаж</th>
        <td><?= htmlspecialchars($tank['team']) ?></td>
    </tr>
    <tr>
        <th>Бронирование корпуса</th>
        <td><?= htmlspecialchars($tank['hull_armor']) ?></td>
    </tr>
    <tr>
        <th>Бронирование башни</th>
        <td><?= htmlspecialchars($tank['tower_armor']) ?></td>
    </tr>
    <tr>
        <th>Мобильность</th>
        <td><?= htmlspecialchars($tank['mobility']) ?></td>
    </tr>
</table>
</body>
</html>