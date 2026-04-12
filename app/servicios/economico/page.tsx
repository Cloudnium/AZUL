// app/servicios/economico/page.tsx
'use client';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import Lightbox from '@/components/ui/Lightbox';

const SERVICIOS = [
  { icon: '/images/platino/CARGADOR.png'},
  { icon: '/images/platino/PELICULASABORDO.png'},
  { icon: '/images/platino/AIREACON.png'},
  { icon: '/images/platino/BUSCAMA.png'},
  { icon: '/images/platino/SEMICAMA.png'},
  { icon: '/images/platino/GPS.png'},
  { icon: '/images/platino/PAGOSEGURO.png'},
  { icon: '/images/platino/BANOQUIMICO.png'},
];

const FOTOS_INTERIOR = [
  '/images/INTERIORPLATINO1.png',
  '/images/INTERIORPLATINO2.png',
  '/images/INTERIORPLATINO3.png',
];


const FOTOS_ALTS = [
  'Interior Económico 1',
  'Interior Económico 2',
  'Interior Económico 3',
];

export default function EconomicoPage() {
  return (
    <div className="w-full" style={{ background: '#0560c5' }}>

      {/* ── HERO BUS ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/images/BUSECONOMICO.png"       // ← cambia esta ruta
          alt="Bus Azul"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* ── CONTENEDOR AZUL ──────────────────────────────────── */}
      <div
        className="nuevo-servicio-container relative z-10 px-[5%] pb-16"
        style={{
          background: '#0560c5',
          borderRadius: '40px 40px 0 0',
          marginTop: -25,
          paddingTop: 28,
        }}
      >

        {/* ── LOGO + TÍTULO — centrado, sin asiento ────────────── */}
        <div className="relative max-w-4xl mx-auto mb-14">
          <div className="flex flex-col items-center gap-14">

            {/* Logo */}
            <FadeIn direction="up" delay={0.1}>
              <Image
                src="/images/LOGO.png"     // ← cambia esta ruta
                alt="Logo Servicio"
                width={500}
                height={130}
                style={{
                  width: 'clamp(200px, 38vw, 520px)',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </FadeIn>

            {/* Título */}
            <FadeIn direction="up" delay={0.2}>
              <div className="text-center">
                <p style={{
                  margin: 0,
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 'clamp(18px, 4vw, 45px)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  lineHeight: 1.2,
                }}>
                  SERVICIO
                </p>
                <h1 style={{
                  margin: 0,
                  color: '#fff',
                  fontSize: 'clamp(32px, 5.5vw, 72px)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}>
                  A BORDO
                </h1>
              </div>
            </FadeIn>

          </div>
        </div>

        {/* ── ÍCONOS ───────────────────────────────────────────── */}
        <FadeIn direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto mb-14">

            {/* Desktop: 8 columnas */}
            <div className="hidden md:grid grid-cols-8 gap-3">
              {SERVICIOS.map((s) => (
                <div key={s.alt} className="flex justify-center items-center">
                  <div style={{ width: 'clamp(48px, 7vw, 88px)', height: 'clamp(48px, 7vw, 88px)', position: 'relative' }}>
                    <Image src={s.icon} alt={s.alt} fill sizes="88px"
                      style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: 2 columnas × 4 filas */}
            <div className="grid md:hidden grid-cols-2 gap-x-4 gap-y-6">
              {SERVICIOS.map((s) => (
                <div key={s.alt} className="flex flex-col items-center gap-2">
                  <div style={{ width: '18vw', height: '18vw', position: 'relative' }}>
                    <Image src={s.icon} alt={s.alt} fill sizes="18vw"
                      style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.3 }}>
                    {s.alt}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </FadeIn>

        {/* ── FOTOS INTERIORES ─────────────────────────────────── */}
        <div className="max-w-4xl mx-auto">
          <Lightbox images={FOTOS_INTERIOR} alts={FOTOS_ALTS} />
        </div>

      </div>
    </div>
  );
}