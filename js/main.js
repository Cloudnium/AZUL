/* ============================================================
   ⚡ JAVASCRIPT — Funciones de la página
   ============================================================

   ÍNDICE DE FUNCIONES:
   1. Menú hamburguesa móvil
   2. Pestañas del buscador (Ida y vuelta / Solo ida)
   3. Scroll suave del navbar
   4. Navbar transparente → sólido al hacer scroll
   5. Animación de entrada de secciones (Intersection Observer)
   ============================================================ */


/* ============================================================
   1. 🍔 MENÚ HAMBURGUESA (móvil)
   Abre/cierra el menú en pantallas pequeñas
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Accesibilidad
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });

  // Cierra al hacer clic en un enlace (móvil)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}


/* ============================================================
   2. 📑 PESTAÑAS DEL BUSCADOR
   Cambia entre "Ida y vuelta" y "Solo ida"
   Para añadir más pestañas: agrega un <button class="tab" data-tab="nueva">
   y maneja su lógica aquí
   ============================================================ */
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Quita clase activa de todos
    tabs.forEach(t => t.classList.remove('active'));
    // Activa el clickeado
    tab.classList.add('active');

    const tabName = tab.dataset.tab;

    // Muestra/oculta el campo de REGRESO según la pestaña
    const campoRegreso = document.querySelector('.search-field:last-of-type');
    if (tabName === 'solo-ida') {
      if (campoRegreso) campoRegreso.style.display = 'none';
    } else {
      if (campoRegreso) campoRegreso.style.display = '';
    }
  });
});


/* ============================================================
   3. 🎨 NAVBAR: EFECTO SCROLL
   El navbar se vuelve más oscuro al bajar la página
   Para desactivar este efecto, comenta todo este bloque
   ============================================================ */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(0, 43, 100, 0.97)';
    navbar.style.backdropFilter = 'blur(8px)';
  } else {
    navbar.style.background = 'var(--color-primary)';
    navbar.style.backdropFilter = 'none';
  }
}, { passive: true });


/* ============================================================
   4. ✨ ANIMACIONES DE ENTRADA (Intersection Observer)
   Los elementos con class="fade-in" aparecen al hacer scroll
   Para usar: agrega class="fade-in" a cualquier elemento en el HTML
   ============================================================ */

// Agrega la clase automáticamente a secciones relevantes
document.querySelectorAll('.destino-card, .feature-item, .mejoramos__year').forEach(el => {
  el.classList.add('fade-in');
});

// Estilos base para la animación
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Escalonamiento para grupos de elementos
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ============================================================
   5. 🔍 FUNCIÓN DE BÚSQUEDA
   Se ejecuta al pulsar el botón azul del buscador
   Personaliza la lógica de búsqueda aquí
   ============================================================ */
const btnSearch = document.querySelector('.btn-search');

if (btnSearch) {
  btnSearch.addEventListener('click', () => {
    const origen  = document.querySelector('.search-field:nth-child(1) input')?.value.trim();
    const destino = document.querySelector('.search-field:nth-child(2) input')?.value.trim();
    const salida  = document.querySelector('.search-field:nth-child(3) input')?.value;
    const regreso = document.querySelector('.search-field:nth-child(4) input')?.value;

    if (!origen || !destino) {
      alert('Por favor ingresa origen y destino.');
      return;
    }

    // ============================================================
    // 🔧 LÓGICA DE BÚSQUEDA — personaliza aquí
    // Ejemplo: redirigir a una página de resultados
    // window.location.href = `/resultados?origen=${origen}&destino=${destino}&salida=${salida}`;
    // ============================================================
    console.log('Búsqueda:', { origen, destino, salida, regreso });
    alert(`Buscando pasajes: ${origen} → ${destino}`);
  });
}


/* ============================================================
   6. 🚌 BOTONES RESERVAR
   Lógica al presionar "RESERVAR" en una tarjeta de destino
   ============================================================ */
document.querySelectorAll('.btn-reservar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card    = e.target.closest('.destino-card');
    const destino = card?.querySelector('h3')?.textContent;

    // ============================================================
    // 🔧 PERSONALIZA AQUÍ la acción al reservar
    // Ejemplo: window.location.href = `/comprar?destino=${destino}`;
    // ============================================================
    alert(`Reservar pasaje a: ${destino}`);
  });
});
