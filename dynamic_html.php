<?php
// Получаем данные из тела запроса
$data = json_decode(file_get_contents("php://input"), true);

// Проверяем, что данные получены
if ($data) {
    
    // Обрабатываем данные (например, сохраняем в базу данных)
    // В этом примере просто возвращаем данные обратно
    echo json_encode(["status" => "success"]);
    $data = json_encode($data);
    file_put_contents('data.json', $data);
} else {
    echo json_encode(["status" => "error", "message" => "Данные не получены"]);
}
?>