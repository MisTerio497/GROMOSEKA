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