<?php
    // Подключаемся к базе данных
    $pdo = require_once "data.conf.php";
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_id'])) {
        $delete_id = $_POST['delete_id'];
        $stmt = $pdo->prepare("DELETE FROM tanks WHERE id = :id");
        $stmt->execute([':id' => $delete_id]);
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }
    // Обработка отправки формы
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Получаем и фильтруем данные из формы
        $nametank = filter_input(INPUT_POST, 'nametank', FILTER_SANITIZE_STRING);
        $image_url = filter_input(INPUT_POST, 'image_url', FILTER_VALIDATE_URL);

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM tanks WHERE nametank = :nametank");
        $stmt->execute([':nametank' => $nametank]);
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            header('Location: ' . $_SERVER['PHP_SELF']);
            echo "Ошибка: Танк с названием '$nametank' уже существует.";
        }
        // Проверяем, что все поля заполнены
        if ($nametank && $image_url) {
            // Вставляем данные в таблицу
            $stmt = $pdo->prepare('INSERT INTO tanks (nametank, image_url) VALUES (:nametank, :image_url)');
            $stmt->execute([':nametank' => $nametank, ':image_url' => $image_url]);
        } else {
            echo "Пожалуйста, заполните все поля формы корректно.";
        }
        header('Location: ' . $_SERVER['PHP_SELF']);

    }

    // Выполняем SQL-запрос
    $stmt = $pdo->query('SELECT * FROM tanks');

    // Получаем все строки в виде ассоциативного массива
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <!doctype html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Список танков</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: left;
            }
            img {
                max-width: 100px;
                height: auto;
            }
            .hover-button {
                display: none; /* Скрываем кнопку по умолчанию */
                padding: 10px 20px;
                background-color: blue;
                color: white;
                border: none;
                cursor: pointer;
            }

            /* Показываем кнопку при наведении на контейнер */
            .hover-container:hover .hover-button {
                display: block;
            }
        </style>
    </head>
    <body>
    <h1>Список танков</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Картинка</th>
        </tr>
        <?php foreach ($result as $res): ?>
            <tr>
                <td><?= htmlspecialchars($res['id']) ?></td>
                <td><?= htmlspecialchars($res['nametank']) ?></td>
                <td>
                    <?php if (!empty($res['image_url'])): ?>
                        <img src="<?= htmlspecialchars($res['image_url']) ?>" alt="<?= htmlspecialchars($res['nametank']) ?>">
                    <?php else: ?>
                        Нет изображения
                    <?php endif; ?>
                    <form method="post" action="index.php">
                        <input type="hidden" name="delete_id" value="<?= htmlspecialchars($res['id']) ?>">
                        <button type="submit" class="hover-button">Удалить</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
        <form action="index.php" method="post">
            <label>
                <tr>
                    <th><?= htmlspecialchars($res['id']+1)?></th>
                    <th><input name="nametank" type="text" required><br></th>
                    <th><input name="image_url" type="text" required><br> <input type="submit" value="Добавить"></th>
                </tr>

            </label>
        </form>
    </table>
    </body>
    </html>