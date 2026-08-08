// Sobre Efecto //

<script>
(function () {
  function iniciarSobre() {
    const overlay = document.getElementById('sobre-overlay');
    const sello = document.getElementById('sello');
    const solapa = document.getElementById('solapa');
    const tarjeta = document.querySelector('.tarjeta-invitacion');
    const textoTap = document.querySelector('.texto-tap');

    // Comprobación: si falta algún elemento, avisamos en consola
    if (!overlay || !sello || !solapa || !tarjeta) {
      console.error('Falta algún elemento del sobre. Revisa los IDs/clases en el HTML.');
      return;
    }

    document.body.classList.add('sobre-activo');

    function abrirSobre() {
      sello.removeEventListener('click', abrirSobre);
      sello.classList.add('roto');
      if (textoTap) textoTap.style.opacity = '0';

      setTimeout(() => {
        solapa.classList.add('abierta');
      }, 200);

      setTimeout(() => {
        tarjeta.classList.add('visible');
      }, 700);

      setTimeout(() => {
        overlay.classList.add('oculto');
        document.body.classList.remove('sobre-activo');
      }, 2200);

      setTimeout(() => {
        overlay.remove();
      }, 3000);
    }

    sello.addEventListener('click', abrirSobre);
    // Por si en móvil el click no responde bien, añadimos touchstart también
    sello.addEventListener('touchstart', function(e){
      e.preventDefault();
      abrirSobre();
    }, { passive: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSobre);
  } else {
    iniciarSobre();
  }
})();
</script>

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



