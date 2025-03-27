<?php
header('Content-Type: application/json');

// Подключение к базе данных
try {
    $pdo = require_once 'data.conf.php';
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $e->getMessage()]);
    exit;
}

try {
    $sql = "SELECT * FROM tanks";
    $stmt = $pdo->query($sql);

    $image_url = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($image_url) {
        echo json_encode($image_url);
    } else {
        echo json_encode(['error' => 'Нет данных']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка при выполнении запроса: ' . $e->getMessage()]);
}
?>
