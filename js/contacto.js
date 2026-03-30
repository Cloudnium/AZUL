/* ============================================================
   ⚡ CONTACTO.JS — Funciones exclusivas de contacto.html
   ============================================================

   ÍNDICE DE FUNCIONES:
   1. Validación y envío del formulario de contacto
   2. Feedback visual al usuario (éxito / error)
   ============================================================ */


/* ============================================================
   1. 📩 FORMULARIO DE CONTACTO
   ============================================================ */
const btnEnviar  = document.getElementById('btnEnviar');
const feedback   = document.getElementById('form-feedback');

const campos = {
  nombre:  document.getElementById('nombre'),
  email:   document.getElementById('email'),
  asunto:  document.getElementById('asunto'),
  detalle: document.getElementById('detalle'),
};

if (btnEnviar) {
  btnEnviar.addEventListener('click', () => {
    /* Limpia feedback previo */
    setFeedback('', '');

    /* ── VALIDACIÓN ── */
    const nombre  = campos.nombre?.value.trim();
    const email   = campos.email?.value.trim();
    const asunto  = campos.asunto?.value.trim();
    const detalle = campos.detalle?.value.trim();

    if (!nombre) {
      setFeedback('Por favor ingresa tu nombre.', 'error');
      campos.nombre?.focus();
      return;
    }
    if (!email || !esEmailValido(email)) {
      setFeedback('Por favor ingresa un correo electrónico válido.', 'error');
      campos.email?.focus();
      return;
    }
    if (!asunto) {
      setFeedback('Por favor ingresa el asunto.', 'error');
      campos.asunto?.focus();
      return;
    }
    if (!detalle) {
      setFeedback('Por favor escribe el detalle de tu consulta.', 'error');
      campos.detalle?.focus();
      return;
    }

    /* ============================================================
       🔧 LÓGICA DE ENVÍO — personaliza aquí

       Opción A — mailto (abre el cliente de correo del usuario):
         window.location.href = `mailto:contacto@azul.com.pe
           ?subject=${encodeURIComponent(asunto)}
           &body=${encodeURIComponent(`Nombre: ${nombre}\nDetalle: ${detalle}`)}`;

       Opción B — envío a una API/backend:
         fetch('/api/contacto', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ nombre, email, asunto, detalle })
         })
         .then(r => r.json())
         .then(data => {
           if (data.ok) { limpiarFormulario(); setFeedback('¡Mensaje enviado!', 'success'); }
           else { setFeedback('Error al enviar. Intenta de nuevo.', 'error'); }
         });

       Opción C — Formspree (sin backend):
         Cambia el action del form a https://formspree.io/f/TU_ID
       ============================================================ */

    /* Por defecto: muestra éxito y limpia el formulario */
    limpiarFormulario();
    setFeedback('✅ ¡Mensaje enviado! Te responderemos pronto.', 'success');

    /* Oculta el mensaje después de 5 segundos */
    setTimeout(() => setFeedback('', ''), 5000);
  });
}

/* Envía con Enter en los inputs (no en el textarea) */
[campos.nombre, campos.email, campos.asunto].forEach(input => {
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') btnEnviar?.click();
  });
});


/* ============================================================
   2. 🔧 HELPERS
   ============================================================ */

/** Valida formato de email */
function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Muestra un mensaje de feedback con clase CSS */
function setFeedback(mensaje, tipo) {
  if (!feedback) return;
  feedback.textContent  = mensaje;
  feedback.className    = 'form-feedback';
  if (tipo) feedback.classList.add(tipo);
}

/** Limpia todos los campos del formulario */
function limpiarFormulario() {
  Object.values(campos).forEach(c => { if (c) c.value = ''; });
}
