
async function fetchData() {
    try {
        const response = await fetch('search.php');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON

        return data;// Выводим результаты поиска
    } catch (error) {
        console.error('Ошибка:', error); // Обработка ошибок
    }
}
