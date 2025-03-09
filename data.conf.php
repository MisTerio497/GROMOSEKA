<?php
$host = 'localhost';
$dbname = 'postgres';
$user = 'postgres';
$password = 'admin';

$pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);

return $pdo;
