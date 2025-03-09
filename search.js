const imageUrls = [];

fetch('search.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
      const urls = data.map(item => item.image_url);
      urls.forEach(url => {
        imageUrls.push(url);
      });
    })
    .catch(error => {
        console.error('Ошибка:', error); // Обработка ошибок
    });