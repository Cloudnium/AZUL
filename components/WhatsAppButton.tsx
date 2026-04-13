// components/WhatsAppButton.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

// ──────────────────────────────────────────────
//  CONFIGURACIÓN — edita solo esta sección
// ──────────────────────────────────────────────
const WHATSAPP_CONFIG = {
  /** Número con código de país, sin espacios ni guiones */
  phone: '51991887406',

  /** Mensaje predeterminado que aparecerá en WhatsApp */
  message: '¡Hola! Quiero información sobre los servicios de Transportes Azul 🚌',

  /**
   * Logo del botón.
   * Opciones:
   *   'whatsapp'  → ícono verde clásico de WhatsApp (SVG integrado)
   *   '/images/LOGO.png' → cualquier ruta de tu carpeta /public
   */
  logo: 'whatsapp' as 'whatsapp' | string,

  /** Color de fondo del botón (cuando logo = 'whatsapp') */
  bgColor: '#25D366',

  /** Tooltip que aparece al pasar el cursor */
  tooltip: '¡Chatea con nosotros!',
};
// ──────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <path d="M16.002 2C8.28 2 2 8.28 2 16c0 2.478.654 4.8 1.793 6.81L2 30l7.38-1.766A13.93 13.93 0 0 0 16.002 30C23.72 30 30 23.72 30 16S23.72 2 16.002 2Zm0 25.4a11.32 11.32 0 0 1-5.77-1.575l-.414-.247-4.38 1.048 1.072-4.268-.27-.44A11.35 11.35 0 0 1 4.6 16c0-6.287 5.115-11.4 11.402-11.4S27.4 9.713 27.4 16 22.287 27.4 16.002 27.4Zm6.24-8.528c-.342-.171-2.025-1-2.34-1.113-.315-.114-.545-.171-.774.171-.23.343-.886 1.114-1.087 1.343-.2.228-.4.257-.742.086-.342-.172-1.445-.533-2.752-1.698-1.018-.907-1.706-2.026-1.906-2.37-.2-.342-.021-.527.15-.697.155-.153.343-.4.514-.6.172-.199.229-.342.343-.57.114-.23.057-.428-.028-.6-.086-.171-.774-1.87-1.06-2.56-.28-.672-.563-.58-.774-.59l-.66-.011c-.228 0-.6.086-.914.428-.315.343-1.2 1.172-1.2 2.856 0 1.685 1.228 3.312 1.4 3.541.171.228 2.414 3.684 5.85 5.167.817.352 1.455.563 1.952.72.82.261 1.567.224 2.157.136.658-.098 2.025-.827 2.312-1.626.285-.8.285-1.484.199-1.626-.085-.143-.314-.228-.657-.4Z"/>
    </svg>
  );
}

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const encoded = encodeURIComponent(WHATSAPP_CONFIG.message);
    const url = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isCustomLogo = WHATSAPP_CONFIG.logo !== 'whatsapp';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {hovered && (
        <div className="bg-gray-800 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          {WHATSAPP_CONFIG.tooltip}
        </div>
      )}

      {/* Botón */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        style={{ backgroundColor: isCustomLogo ? 'transparent' : WHATSAPP_CONFIG.bgColor }}
      >
        {/* Pulso animado */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: isCustomLogo ? '#25D366' : WHATSAPP_CONFIG.bgColor }}
        />

        {isCustomLogo ? (
          <Image
            src={WHATSAPP_CONFIG.logo}
            alt="WhatsApp"
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <WhatsAppIcon />
        )}
      </button>
    </div>
  );
}
