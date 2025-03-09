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
//$query = $_GET['q'] ?? '';

// if (empty($query)) {
//     echo json_encode([]);
//     exit;
// }
// Выполняем SQL-запрос для поиска
try {
    $sql = "SELECT * FROM tanks";
    $stmt = $pdo->query($sql);

    $image_url= $stmt->fetchAll(PDO::FETCH_ASSOC); // Получаем массив названий
    echo json_encode($image_url);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка при выполнении запроса: ' . $e->getMessage()]);
}

