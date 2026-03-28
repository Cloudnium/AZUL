# 🚌 AZUL — Sitio Web

Página web oficial de Azul. Clona o edita los archivos según las indicaciones.

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
azul-website/
│
├── index.html              ← Estructura HTML de la página
├── css/
│   └── style.css           ← Todos los estilos y colores
├── js/
│   └── main.js             ← Funciones interactivas
├── images/
│   ├── logo.png            ← 🖼️ Logo principal (navbar y footer)
│   ├── logo-platino.png    ← 🖼️ Logo "Azul Platino" en el banner
│   ├── hero-bg.jpg         ← 🖼️ Fondo principal de la página
│   ├── bus-flota.png       ← 🖼️ Imagen del bus en el banner 2026
│   ├── icons/              ← Iconos de badges (GPS, WiFi, etc.)
│   └── destinos/
│       ├── trujillo.jpg    ← 🖼️ Foto destino Trujillo
│       ├── piura.jpg       ← 🖼️ Foto destino Piura
│       └── sullana.jpg     ← 🖼️ Foto destino Sullana
└── README.md
```

---

## 🖼️ CÓMO CAMBIAR IMÁGENES

| Imagen | Dónde cambiarlo | Archivo |
|--------|----------------|---------|
| **Logo (navbar y footer)** | `<img src="images/logo.png">` | index.html |
| **Logo Platino** | `<img src="images/logo-platino.png">` | index.html |
| **Fondo del hero** | `.hero { background-image: url('../images/hero-bg.jpg') }` | css/style.css |
| **Bus flota 2026** | `<img src="images/bus-flota.png">` | index.html |
| **Foto Trujillo** | `<img src="images/destinos/trujillo.jpg">` | index.html |
| **Foto Piura** | `<img src="images/destinos/piura.jpg">` | index.html |
| **Foto Sullana** | `<img src="images/destinos/sullana.jpg">` | index.html |
| **Iconos de badges** | Reemplaza el emoji por `<img src="images/icons/nombre.png">` | index.html |

---

## 🔤 CÓMO CAMBIAR LAS FUENTES

1. Abre **index.html** y busca la sección `🔤 FUENTES DE LETRA`
2. Cambia el link de Google Fonts por la fuente que quieras:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=TuFuente:wght@400;700;900&display=swap" rel="stylesheet" />
   ```
3. Abre **css/style.css** y busca `:root` al inicio del archivo:
   ```css
   --font-display: 'TuFuente', sans-serif;  /* Títulos */
   --font-body:    'TuOtraFuente', sans-serif; /* Textos */
   ```

Fuentes recomendadas para reemplazar:
- `Poppins` — moderna y amigable
- `Barlow Condensed` — impacto industrial
- `Oswald` — títulos fuertes
- `Raleway` — elegante

---

## 🎨 CÓMO CAMBIAR COLORES

Abre **css/style.css** y edita las variables al inicio del archivo:

```css
:root {
  --color-primary:      #005bbb;  /* Azul principal */
  --color-primary-dark: #003d82;  /* Azul oscuro */
  --color-accent:       #0077e6;  /* Azul acento / botones */
  --color-banner-bg:    #0055a5;  /* Fondo banner Flota 2026 */
  --color-mejoramos-bg: #111827;  /* Fondo sección Mejoramos */
  --color-footer-bg:    #0d1b35;  /* Fondo footer */
}
```

---

## ⚙️ FUNCIONES DE LA PÁGINA (js/main.js)

| # | Función | Qué hace |
|---|---------|----------|
| 1 | **Menú hamburguesa** | Abre/cierra el menú en móviles |
| 2 | **Pestañas buscador** | Cambia entre "Ida y vuelta" y "Solo ida" |
| 3 | **Efecto scroll navbar** | El navbar se oscurece al bajar |
| 4 | **Animaciones de entrada** | Las tarjetas aparecen con fade al hacer scroll |
| 5 | **Función de búsqueda** | Botón azul del buscador — personaliza la lógica aquí |
| 6 | **Botones Reservar** | Acción al presionar "RESERVAR" en un destino |

Para personalizar la búsqueda, busca en **js/main.js** el comentario:
```
🔧 LÓGICA DE BÚSQUEDA — personaliza aquí
```

---

## ➕ CÓMO AÑADIR UN NUEVO DESTINO

Copia este bloque en **index.html** dentro de `.destinos__grid`:

```html
<div class="destino-card">
  <img src="images/destinos/mi-destino.jpg" alt="Mi Destino"
       onerror="this.src='https://placehold.co/400x250/1a3a6b/fff?text=Mi+Destino'" />
  <div class="destino-card__overlay">
    <h3>Mi Destino</h3>
    <p class="precio">Desde S/ 45.00</p>
    <button class="btn-reservar">RESERVAR →</button>
  </div>
</div>
```

---

## 📱 ADAPTABILIDAD (Responsive)

La página se adapta automáticamente a:
- **Desktop** (> 900px): Layout completo
- **Tablet** (≤ 900px): Footer de 2 columnas
- **Móvil** (≤ 680px): Menú hamburguesa, buscador vertical, 1 columna
- **Móvil pequeño** (≤ 400px): Badges y features compactos

Para ajustar los breakpoints, busca `@media` en **css/style.css**.
