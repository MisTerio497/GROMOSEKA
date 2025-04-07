<?php
header("Content-Type: application/json");

try {
    $pdo = require_once "data.conf.php";
    $stmt = $pdo->query("SELECT * FROM tanks");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($data ?: []); // Всегда возвращаем массив, даже пустой
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
}