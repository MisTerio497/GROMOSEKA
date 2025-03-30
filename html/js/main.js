document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  document.querySelector(".prev").addEventListener("click", function () {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });

  document.querySelector(".next").addEventListener("click", function () {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
});
// Определяем функцию fetchData
async function fetchData() {
  try {
    const response = await fetch("/api/search.php");
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json(); // Пытаемся распарсить JSON
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    return []; // Возвращаем пустой массив, если произошла ошибка
  }
}

// Определяем функцию searchFetchData
async function searchFetchData() {
  const data = await fetchData(); // Получаем данные

  // Убедимся, что данные успешно получены
  if (!data || data.length === 0) {
    console.error('Данные не были загружены или пусты');
    return;
  }
}

// Запускаем функцию
searchFetchData();
