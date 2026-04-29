'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AnuncioPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const yaVisto = sessionStorage.getItem('anuncio-visto');
      if (!yaVisto) {
        setVisible(true);
      }
    }, 0);
  }, []);

  function cerrar() {
    sessionStorage.setItem('anuncio-visto', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      onClick={cerrar}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Botón cerrar */}
        <button
          onClick={cerrar}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg transition-opacity hover:opacity-80"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          aria-label="Cerrar anuncio"
        >
          ✕
        </button>

        {/* Imagen */}
        <Image
          src="/images/ANUNCIOAZUL.jpeg"
          alt="Anuncio Azul"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />

        {/* Botón inferior */}
        <button
          onClick={cerrar}
          className="w-full py-3 text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
          style={{ background: '#1a4fa0' }}
        >
          Cerrar anuncio
        </button>
      </div>
    </div>
  );
}
