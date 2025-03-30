<?php
require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('/var/www/html/static');
$twig = new \Twig\Environment($loader, [
    'cache' => 'cache',
    'debug' => true,
]);

// Подключение к БД
$pdo = require_once "data.conf.php";
$id = $_POST['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID parameter is required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM tanks WHERE id = :id");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
    
$tank = $stmt->fetch(PDO::FETCH_ASSOC);
    
if (!$tank) {
    http_response_code(404);
    exit;
}

// Правильная передача данных в шаблон
echo $twig->render('404.html', [
    'tank' => $tank // Передаем весь массив как 'tank'
]);