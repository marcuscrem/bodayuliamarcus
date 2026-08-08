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


// Sobre Efecto //

<script>
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('sobre-overlay');
  const sello = document.getElementById('sello');
  const solapa = document.getElementById('solapa');
  const tarjeta = document.querySelector('.tarjeta-invitacion');
  const textoTap = document.querySelector('.texto-tap');

  // Bloquear scroll mientras se muestra el sobre
  document.body.classList.add('sobre-activo');

  sello.addEventListener('click', abrirSobre);

  function abrirSobre() {
    // Evitar doble clic
    sello.removeEventListener('click', abrirSobre);

    // 1. Sello se rompe
    sello.classList.add('roto');
    textoTap.style.opacity = '0';

    // 2. Solapa se abre (después de que el sello empiece a desaparecer)
    setTimeout(() => {
      solapa.classList.add('abierta');
    }, 200);

    // 3. Tarjeta emerge
    setTimeout(() => {
      tarjeta.classList.add('visible');
    }, 700);

    // 4. Todo el overlay se desvanece y se revela la web
    setTimeout(() => {
      overlay.classList.add('oculto');
      document.body.classList.remove('sobre-activo');
    }, 2200);

    // 5. Eliminar el overlay del DOM tras la transición (opcional, limpieza)
    setTimeout(() => {
      overlay.remove();
    }, 3000);
  }
});
</script>
