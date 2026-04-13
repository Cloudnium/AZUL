// app/servicios/platino/page.tsx
'use client';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import Lightbox from '@/components/ui/Lightbox';

const SERVICIOS = [
  { icon: '/images/platino/CARGADOR.png',        alt: '' },
  { icon: '/images/platino/PELICULASABORDO.png',  alt: '' },
  { icon: '/images/platino/AIREACON.png',         alt: '' },
  { icon: '/images/platino/BUSCAMA.png',          alt: '' },
  { icon: '/images/platino/SEMICAMA.png',         alt: '' },
  { icon: '/images/platino/GPS.png',              alt: '' },
  { icon: '/images/platino/PAGOSEGURO.png',       alt: '' },
  { icon: '/images/platino/BANOQUIMICO.png',      alt: '' },
];

const FOTOS_INTERIOR = [
  '/images/INTERIORPLATINO1.png',
  '/images/INTERIORPLATINO2.png',
  '/images/INTERIORPLATINO3.png',
];

const FOTOS_ALTS = [
  'Interior Platino 1',
  'Interior Platino 2',
  'Interior Platino 3',
];

export default function PlatinoPage() {
  return (
    <div className="w-full" style={{ background: '#050a4e' }}>

      {/* ── HERO BUS ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/images/BUSPLATINO.png"
          alt="Bus Azul Platino"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* ── CONTENEDOR AZUL CON DEGRADADO ────────────────────── */}
      <div
        className="platino-container relative z-10 px-[5%] pb-16"
        style={{
          background: `
            radial-gradient(ellipse 50% 85% at 92% 22%, #1e40af 0%, #0d1f6e 48%, #020818 100%),
            linear-gradient(to right, #020818 0%, #050a4e 40%)
          `,
          backgroundBlendMode: 'screen',
          borderRadius: '40px 40px 0 0',
          marginTop: -25,
          paddingTop: 28,
        }}
      >

        {/* ── BLOQUE LOGO + TÍTULO + ASIENTO ─────────────────── */}
        <div className="relative max-w-4xl mx-auto mb-4">

          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">

            {/* Columna izquierda: Logo + Título */}
            <div
              className="flex flex-col flex-1 items-center md:items-start"
              style={{ gap: 'clamp(1rem, 5vw, 6rem)' }}
            >
              <FadeIn direction="left" delay={0.1}>
                <Image
                  src="/images/AZULPLATINO.png"
                  alt="Azul Platino"
                  width={500}
                  height={130}
                  style={{
                    width: 'clamp(200px, 38vw, 520px)',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </FadeIn>

              <FadeIn direction="up" delay={0.25}>
                <div className="text-center md:text-left">
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

            {/* Asiento desktop */}
            <FadeIn direction="right" delay={0.15} style={{ flexShrink: 0 }} className="hidden md:flex justify-end">
              <div style={{
                width: 'clamp(240px, 38vw, 460px)',
                height: 'clamp(260px, 40vw, 500px)',
                position: 'relative',
                marginTop: '1rem',
              }}>
                <Image
                  src="/images/ASIENTOINTERNO.png"
                  alt="Asiento Platino"
                  fill
                  sizes="(max-width: 768px) 360px, 460px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </FadeIn>
          </div>

          {/* Asiento mobile */}
          <FadeIn direction="up" delay={0.2} className="flex md:hidden justify-center mt-4">
            <div style={{ width: '60vw', height: '48vw', position: 'relative' }}>
              <Image
                src="/images/ASIENTOINTERNO.png"
                alt="Asiento Platino"
                fill
                sizes="60vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </FadeIn>
        </div>

        {/* ── ÍCONOS ───────────────────────────────────────────── */}
        <FadeIn direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto mb-14">
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-8 gap-3">
              {SERVICIOS.map((s) => (
                <div key={s.icon} className="flex justify-center items-center">
                  <div style={{ width: 'clamp(48px, 7vw, 88px)', height: 'clamp(48px, 7vw, 88px)', position: 'relative' }}>
                    <Image src={s.icon} alt={s.alt} fill sizes="88px"
                      style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile */}
            <div className="grid md:hidden grid-cols-2 gap-x-4 gap-y-6">
              {SERVICIOS.map((s) => (
                <div key={s.icon} className="flex flex-col items-center gap-2">
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

        {/* ── FOTOS INTERIORES — ahora con Lightbox ────────────── */}
        <div className="max-w-4xl mx-auto">
          <Lightbox images={FOTOS_INTERIOR} alts={FOTOS_ALTS} />
        </div>

      </div>
    </div>
  );
}