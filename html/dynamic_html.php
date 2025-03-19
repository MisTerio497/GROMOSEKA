<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    print_r(json_encode(["status" => "success"]));
    // Сохраняем обновленные данные обратно в файл
    file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
} else {
    // Если данные не получены, возвращаем ошибку
    echo json_encode(["status" => "error", "message" => "Данные не получены"]);
}
?>
