<?php
$host = 'db';  // Имя контейнера PostgreSQL
$dbname = 'tanks';
$user = 'postgres';
$password = 'admin';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    echo "Ошибка подключения: " . $e->getMessage();
}
return $pdo;
?>