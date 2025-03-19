// Определяем функцию fetchData
async function fetchData() {
    try {
        const response = await fetch("search.php");
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        return data; // Возвращаем данные
    } catch (error) {
        console.error("Ошибка:", error); // Обработка ошибок
    }
}

// Определяем функцию searchFetchData
async function searchFetchData() {
    const data = await fetchData(); // Получаем данные
    const search_input = document.getElementById("search-input");
    const result = document.getElementById("results");

    // Обработчик события ввода
    search_input.addEventListener("input", () => {
        const searchTerm = search_input.value.trim().toLowerCase(); // Получаем значение из input

        const filteredData = searchTerm
            ? data.filter((item) => item.nametank.toLowerCase().includes(searchTerm)) // Фильтруем по nametank
            : [];

        result.innerHTML = ""; // Очищаем предыдущие результаты

        // Добавляем отфильтрованные данные в DOM
        if (filteredData.length > 0) {
            filteredData.forEach((item) => {
                const div = document.createElement("div");
                const p = document.createElement("p");
                const img = document.createElement("img");

                p.textContent = item.nametank; // Устанавливаем текст для <p>
                img.src = item.images_url; // Устанавливаем src для <img>
                img.width = 512;
                div.className = "fade-in";

                // Добавляем обработчик события click для картинки
                img.addEventListener("click", () => {
                    sendDataToServer(item); // Отправляем данные на сервер
                });

                div.appendChild(p); // Добавляем <p> в DOM
                div.appendChild(img); // Добавляем <img> в DOM
                result.appendChild(div);

                // Добавляем класс `visible` с задержкой
                setTimeout(() => {
                    div.classList.add("visible");
                }, 10);
            });
        } else {
            result.innerHTML = "<div>Ничего не найдено</div>";
        }
    });
}

// Функция для отправки данных на сервер
async function sendDataToServer(item) {
    try {
        const response = await fetch("dynamic_html.php", {
            method: "POST", // Используем метод POST
            headers: {
                "Content-Type": "application/json", // Указываем тип содержимого
            },
            body: JSON.stringify(item), // Отправляем данные в формате JSON
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json(); // Получаем ответ от сервера
        console.log("Данные успешно отправлены:", result);
    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
    }
}

// Запускаем функцию
searchFetchData();