/* ============================================================
   ⚡ CARGO.JS — Funciones exclusivas de cargo.html
   ============================================================

   ÍNDICE DE FUNCIONES:
   1. Búsqueda de orden por N° y Código
   2. Validación de campos
   ============================================================ */


/* ============================================================
   1. 🔍 BUSCADOR DE ORDEN
   Se ejecuta al presionar el botón "Buscar ▶"
   ============================================================ */
const btnBuscar = document.getElementById('btnBuscarOrden');
const inputNro  = document.getElementById('nroOrden');
const inputCod  = document.getElementById('codigoOrden');

if (btnBuscar) {
  btnBuscar.addEventListener('click', () => {
    const nro    = inputNro?.value.trim();
    const codigo = inputCod?.value.trim();

    /* ✅ VALIDACIÓN — personaliza los mensajes aquí */
    if (!nro && !codigo) {
      mostrarError('Por favor ingresa el N° de Orden o el Código de Orden.');
      return;
    }

    /* ============================================================
       🔧 LÓGICA DE BÚSQUEDA — personaliza aquí
       Ejemplo 1: redirigir a una página de resultados
         window.location.href = `/resultados-cargo?nro=${nro}&codigo=${codigo}`;

       Ejemplo 2: llamar a una API
         fetch(`/api/cargo?nro=${nro}&codigo=${codigo}`)
           .then(res => res.json())
           .then(data => mostrarResultados(data));
       ============================================================ */
    console.log('Búsqueda de cargo:', { nro, codigo });
    alert(`Buscando orden: N° ${nro || '—'}  |  Código: ${codigo || '—'}`);
  });
}

/* Buscar también con Enter en los inputs */
[inputNro, inputCod].forEach(input => {
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btnBuscar?.click();
    });
  }
});


/* ============================================================
   2. ⚠️ MOSTRAR ERROR (helper)
   Muestra un mensaje de error debajo del buscador
   ============================================================ */
function mostrarError(mensaje) {
  /* Quita error previo si existe */
  document.getElementById('cargo-error')?.remove();

  const err = document.createElement('p');
  err.id = 'cargo-error';
  err.textContent = mensaje;
  err.style.cssText = `
    color: #c0392b;
    font-family: var(--font-display, sans-serif);
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 8px;
    padding-left: 4px;
  `;

  /* Inserta debajo del buscador */
  const searchInner = document.querySelector('.cargo-search__inner');
  if (searchInner) {
    searchInner.parentElement.appendChild(err);
    /* Auto-elimina después de 4 segundos */
    setTimeout(() => err.remove(), 4000);
  }
}
