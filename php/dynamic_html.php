<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// Сохраняем данные в файл
file_put_contents('/var/www/html/api/data.json', json_encode($data, JSON_PRETTY_PRINT));

echo json_encode(['status' => 'success']);
?>