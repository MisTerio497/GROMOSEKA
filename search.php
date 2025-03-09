<?php
header('Content-Type: application/json');

// Настройки подключения к базе данных

// Подключение к базе данных
try {
    $pdo = require_once 'data.conf.php';
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $e->getMessage()]);
    exit;
}

// Получаем поисковый запрос
$query = $_GET['q'] ?? '';

if (empty($query)) {
    echo json_encode([]);
    exit;
}

// Выполняем SQL-запрос для поиска
try {
    $sql = "SELECT image_url FROM tanks WHERE nametank LIKE :query";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['query' => "%$query%"]); // Используем % для поиска по частичному совпадению
    $image_url= $stmt->fetchAll(PDO::FETCH_COLUMN); // Получаем массив названий
    $sql = "SELECT nametank FROM tanks WHERE nametank LIKE :query";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['query' => "%$query%"]); // Используем % для поиска по частичному совпадению
    $tank_name= $stmt->fetchAll(PDO::FETCH_COLUMN); // Получаем массив названий
    echo json_encode(['image_url'=>$image_url,'tank_name'=>$tank_name]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка при выполнении запроса: ' . $e->getMessage()]);
}

