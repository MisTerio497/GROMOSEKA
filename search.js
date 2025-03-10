async function fetchData() {
    try {
        const response = await fetch('search.php');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        return data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка:', error); // Обработка ошибок
    }
}

async function searchFetchData() {
    const data = await fetchData(); // Получаем данные
    const search_input = document.getElementById('search-input');
    const result = document.getElementById('results');

    // Обработчик события ввода
    search_input.addEventListener('input', () => {
        const searchTerm = search_input.value.trim().toLowerCase(); // Получаем значение из input

        const filteredData = searchTerm ? data.filter(item => item.nametank.toLowerCase().includes(searchTerm) // Фильтруем по nametank
        ) : [];


        result.innerHTML = ''; // Очищаем предыдущие результаты

        // Добавляем отфильтрованные данные в DOM
        if (filteredData) {
            filteredData.forEach(item => {
                const p = document.createElement('p');
                const img = document.createElement('img');

                p.textContent = item.nametank; // Устанавливаем текст для <p>
                img.src = item.images_url; // Устанавливаем src для <img>
                img.width = 512;

                result.appendChild(p); // Добавляем <p> в DOM
                result.appendChild(img); // Добавляем <img> в DOM
                console.log(item);
            });
        } else { result.innerHTML = '<div>Ничего не найдено</div>>'}

        console.log(filteredData); // Выводим отфильтрованные данные в консоль
    });
}

// Запускаем функцию
searchFetchData();