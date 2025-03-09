<?php
$pdo = require_once "data.conf.php";
$pdo->query('SELECT * FROM tanks');
$result = $pdo->fetchAll(PDO::FETCH_ASSOC);



foreach ($result as $row) {
    echo "";
}
