<?php

$host = 'localhost';
$dbname = 'postgres';
$user = 'postgres';
$password = 'admin';

$pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$username = $_POST['search'];
try {
    // Подготовка SQL-запроса
    $stmt = $pdo->prepare("SELECT * FROM tanks WHERE info = :username");

    // Привязка переменной к параметру
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);

    // Выполнение запроса
    $stmt->execute();

    // Получение результатов
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Вывод результатов

    ?>
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
            .SEARCH {
                display: flex;
                justify-content: center;
            }
        </style>
        <title>Search</title>
    </head>
    <body>
    <div class="SEARCH">
        <form action="tank-info.php" method="post">
            <label>
                <input type="search" name="search">
                <?php
                foreach ($results as $row) {
                $image =  $row['image_url'];
                } ?>
                <img src="<?= $image?>" alt="">
            </label>
        </form>
    </div>
    </body>
    </html>
    <?php
} catch (PDOException $e) {
    die("Ошибка выполнения запроса: " . $e->getMessage());
}
