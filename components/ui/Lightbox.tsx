'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  alts?: string[];
}

export default function Lightbox({ images, alts = [] }: LightboxProps) {
  const [current, setCurrent] = useState<number | null>(null);

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCurrent(null);
      if (e.key === 'ArrowRight' && current !== null) setCurrent((current + 1) % images.length);
      if (e.key === 'ArrowLeft' && current !== null) setCurrent((current - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, images.length]);

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = current !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [current]);

  return (
    <>
      {/* ── GRID DE IMÁGENES ── */}
      {/* Desktop: 3 columnas | Mobile: columna única */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setCurrent(i)}
            className="relative rounded-2xl overflow-hidden group cursor-zoom-in focus:outline-none"
            style={{ height: 'clamp(120px, 14vw, 200px)' }}
          >
            <Image
              src={src}
              alt={alts[i] ?? `Interior ${i + 1}`}
              fill
              sizes="320px"
              style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
              className="group-hover:scale-105"
            />
            {/* Overlay hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="flex md:hidden flex-col gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setCurrent(i)}
            className="relative rounded-2xl overflow-hidden group cursor-zoom-in focus:outline-none w-full"
            style={{ height: '45vw' }}
          >
            <Image
              src={src}
              alt={alts[i] ?? `Interior ${i + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
              className="group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* ── MODAL LIGHTBOX ── */}
      {current !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setCurrent(null)}
        >
          {/* Imagen */}
            <div
            className="relative w-full max-w-4xl mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            >
            <Image
                src={images[current]}
                alt={alts[current] ?? `Interior ${current + 1}`}
                width={1200}
                height={800}
                sizes="90vw"
                style={{
                width: '100%',
                height: 'auto',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                }}
            />
            </div>

          {/* Botón cerrar */}
          <button
            onClick={() => setCurrent(null)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Flechas — solo si hay más de 1 imagen */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
                className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
                className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>

              {/* Indicador puntos */}
              <div className="absolute bottom-4 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}