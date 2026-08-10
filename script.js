
// ===== COUNTDOWN =====
const weddingDate = new Date("2027-09-04T12:00:00").getTime();

const countdownEl = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdownEl.days.textContent = "0";
    countdownEl.hours.textContent = "0";
    countdownEl.minutes.textContent = "0";
    countdownEl.seconds.textContent = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.days.textContent = days;
  countdownEl.hours.textContent = String(hours).padStart(2, "0");
  countdownEl.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEl.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== CARRUSEL RETRATOS =====
document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('carruselTrack');
  const dotsContainer = document.getElementById('carruselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!track) return; // Si no existe la sección, no hace nada

  const slides = Array.from(track.children);
  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();

  // Crear puntitos según número de "páginas"
  function getTotalDots() {
    return Math.ceil(slides.length / slidesPerView);
  }

  function getSlidesPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = getTotalDots();
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.children;
    const activeDot = Math.floor(currentIndex / slidesPerView);
    Array.from(dots).forEach((dot, i) => {
      dot.classList.toggle('active', i === activeDot);
    });
  }

  function goToSlide(dotIndex) {
    currentIndex = dotIndex * slidesPerView;
    if (currentIndex >= slides.length) currentIndex = slides.length - 1;
    updateCarousel();
  }

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width + 30; // + margin
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  function nextSlide() {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex += slidesPerView;
    } else {
      currentIndex = 0; // vuelve al inicio
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= slidesPerView;
    } else {
      currentIndex = slides.length - slidesPerView; // va al final
    }
    updateCarousel();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Soporte para swipe en móvil
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });

  // Recalcular en resize
  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    createDots();
    currentIndex = 0;
    updateCarousel();
  });

  // Inicializar
  createDots();
  updateCarousel();
});

