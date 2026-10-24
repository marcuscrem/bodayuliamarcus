// ===== TRADUCCIONES =====
const translations = {
  es: {
    "pretitle": "Nos casamos",
    "quote": "\"Del Miño al Mediterráneo, dos caminos que se convierten en uno solo\"",
    "countdown": "FALTAN",
    "days": "días",
    "hours": "hs",
    "minutes": "min",
    "seconds": "seg",
    "locations.title": "Dónde celebraremos nuestro día",
    "ceremony": "Ceremonia",
    "celebration": "Celebración",
    "map": "Ver en el mapa",
    "rsvp.title": "Confirma tu asistencia",
    "rsvp.subtitle": "Nos haría muy felices contar contigo. Por favor, confirma antes del <strong>01.06.2027</strong>",
    "songs.title": "¿Qué no puede faltar en la fiesta?",
    "songs.subtitle": "Déjanos aquí tu canción favorita para que suene en nuestra boda",
    "story": "Nuestra historia",
    "portraits": "Retratos de Nuestro Amor",
    "footer.note": "Tui · Alicante"
  },
  en: {
    "pretitle": "We're getting married",
    "quote": "\"From the Miño to the Mediterranean, two paths becoming one\"",
    "countdown": "COUNTDOWN",
    "days": "days",
    "hours": "hrs",
    "minutes": "min",
    "seconds": "sec",
    "locations.title": "Where we'll celebrate our day",
    "ceremony": "Ceremony",
    "celebration": "Celebration",
    "map": "View on map",
    "rsvp.title": "Confirm your attendance",
    "rsvp.subtitle": "It would make us very happy to have you with us. Please confirm before <strong>01.06.2027</strong>",
    "songs.title": "What can't be missing at the party?",
    "songs.subtitle": "Leave us your favourite song so it plays at our wedding",
    "story": "Our story",
    "portraits": "Portraits of Our Love",
    "footer.note": "Tui · Alicante"
  },
  de: {
    "pretitle": "Wir heiraten",
    "quote": "\"Vom Miño bis zum Mittelmeer – zwei Wege, die zu einem werden\"",
    "countdown": "NOCH",
    "days": "Tage",
    "hours": "Std",
    "minutes": "Min",
    "seconds": "Sek",
    "locations.title": "Wo wir unseren Tag feiern",
    "ceremony": "Trauung",
    "celebration": "Feier",
    "map": "Auf der Karte ansehen",
    "rsvp.title": "Bestätige deine Teilnahme",
    "rsvp.subtitle": "Wir würden uns sehr freuen, dich dabei zu haben. Bitte bestätige bis zum <strong>01.06.2027</strong>",
    "songs.title": "Was darf auf der Party nicht fehlen?",
    "songs.subtitle": "Hinterlasse uns hier dein Lieblingslied, damit es auf unserer Hochzeit läuft",
    "story": "Unsere Geschichte",
    "portraits": "Porträts unserer Liebe",
    "footer.note": "Tui · Alicante"
  }
};

function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  setLanguage(localStorage.getItem('lang') || 'es');
});
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

