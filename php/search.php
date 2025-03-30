<?php
header("Content-Type: application/json");

// Подключение к базе данных
$id = $_GET["id"] ?? null;
try {
    $pdo = require_once "data.conf.php";
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Ошибка подключения к базе данных: " . $e->getMessage(),
    ]);
    exit();
}

try {
    $sql = "SELECT * FROM tanks";
    if ($id) {
        $sql = "SELECT * FROM tanks WHERE id = :id";
    }
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($data) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Нет данных"]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Ошибка при выполнении запроса: " . $e->getMessage(),
    ]);
}
?>
