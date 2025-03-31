<?php
header("Content-Type: application/json");

try {
    $pdo = new PDO("pgsql:host=db;dbname=tanks", "postgres", "admin");
    $stmt = $pdo->query("SELECT * FROM tanks");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($data ?: []); // Всегда возвращаем массив, даже пустой
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
}