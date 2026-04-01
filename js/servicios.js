/* ============================================================
   ⚡ SERVICIOS.JS — Funciones compartidas para
   platino.html y economico.html
   ============================================================

   ÍNDICE DE FUNCIONES:
   1. Animaciones de entrada (fade-in al hacer scroll)
   2. Lightbox de galería (ampliar fotos al hacer clic)
   ============================================================ */


/* ============================================================
   1. ✨ ANIMACIONES DE ENTRADA
   Los íconos y la galería aparecen con fade al hacer scroll
   ============================================================ */
const animarAlEntrar = (selectores) => {
  const elementos = document.querySelectorAll(selectores);

  const style = document.createElement('style');
  style.textContent = `
    .anim-hidden {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .anim-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  elementos.forEach(el => el.classList.add('anim-hidden'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('anim-visible'), i * 70);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach(el => obs.observe(el));
};

/* Aplica animaciones a íconos y fotos de galería */
animarAlEntrar('.servicio-icon, .galeria-item');


/* ============================================================
   2. 🔍 LIGHTBOX DE GALERÍA
   Al hacer clic en una foto de la galería se amplía
   Para desactivar esta función, borra todo este bloque
   ============================================================ */

/* Crear el overlay del lightbox */
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <div id="lightbox-bg"></div>
  <div id="lightbox-content">
    <button id="lightbox-close" aria-label="Cerrar">✕</button>
    <img id="lightbox-img" src="" alt="Foto ampliada" />
  </div>
`;
document.body.appendChild(lightbox);

/* Estilos del lightbox */
const lbStyle = document.createElement('style');
lbStyle.textContent = `
  #lightbox {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    align-items: center;
    justify-content: center;
  }
  #lightbox.open { display: flex; }

  #lightbox-bg {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.88);
    cursor: pointer;
  }
  #lightbox-content {
    position: relative;
    z-index: 1;
    max-width: 90vw;
    max-height: 85vh;
  }
  #lightbox-img {
    display: block;
    max-width: 90vw;
    max-height: 85vh;
    border-radius: 8px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.7);
    object-fit: contain;
  }
  #lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
    font-weight: 700;
    line-height: 1;
    transition: opacity 0.2s;
  }
  #lightbox-close:hover { opacity: 0.7; }
`;
document.head.appendChild(lbStyle);

/* Abrir lightbox al hacer clic en foto de galería */
document.querySelectorAll('.galeria-item img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').classList.add('open');
  });
});

/* Cerrar lightbox */
document.getElementById('lightbox-close').addEventListener('click', cerrarLightbox);
document.getElementById('lightbox-bg').addEventListener('click', cerrarLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });

function cerrarLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-img').src = '';
}
