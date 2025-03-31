<?php
header("Content-Type: application/json");

// Подключение к базе данных
$id = $_GET["id"] ?? null;
$nametank = $_GET["nametank"] ?? null;
try {
    $pdo = require_once "data.conf.php";
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Ошибка подключения к базе данных",
    ]);
    exit();
}

try {
    $sql = "SELECT * FROM tanks";
    $params = [];
    
    if ($id !== null) {
        $sql .= " WHERE id = :id";
        $params[":id"] = (int)$id;
    }
    
    if ($nametank !== null) {
        $sql .= " WHERE nametank = :nametank";
        $params[":nametank"] = $nametank;
    }
    
    $stmt = $pdo->prepare($sql);
    
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value, PDO::PARAM_INT);
    }
    
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($data) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Нет данных"]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Ошибка при выполнении запроса",
    ]);
}
?>