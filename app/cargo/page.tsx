// app/cargo/page.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

const SERVICIOS = [
  { icon: '/images/ICON-CARGADOR.png',  label: 'CARGADOR\nDE CELULAR' },
  { icon: '/images/ICON-PELICULAS.png', label: 'PELÍCULAS\nA BORDO' },
  { icon: '/images/ICON-AIRE.png',      label: 'AIRE\nACONDICIONADO' },
  { icon: '/images/ICON-BUSCAMA.png',   label: 'BUS CAMA\n160°' },
  { icon: '/images/ICON-SEMICAMA.png',  label: 'SEMI CAMA\n145°' },
  { icon: '/images/ICON-GPS.png',       label: 'MONITOREO\nGPS' },
  { icon: '/images/ICON-BANIO.png',     label: 'BAÑO\nQUÍMICO' },
];

export default function CargoPage() {
  const [orden, setOrden]   = useState('');
  const [codigo, setCodigo] = useState('');

  return (
    <div className="bg-white">

      {/* ── DESKTOP ── */}
      <div
        className="relative w-full bg-[#0560c5] hidden sm:block"
        style={{ overflow: 'visible', height: 452 }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white"
          style={{
            width: '58%',
            clipPath: 'polygon(0 0, 55% 0, 90% 100%, 0 100%)',
            zIndex: 0,
          }}
        />
        <div className="relative flex flex-row items-center w-full h-full" style={{ zIndex: 1 }}>
          <div className="relative shrink-0 w-[55%] self-end" style={{ marginBottom: -50 }}>
            <div className="relative w-full" style={{ paddingBottom: '60%' }}>
              <Image src="/images/CAMION.png" alt="Camión Azul Cargo" fill priority className="object-contain object-bottom" />
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 pr-6 sm:pr-12 lg:pr-20 h-full">
            <FadeIn direction="right" delay={0.1}>
              <h1 className="text-white font-semibold uppercase leading-none" style={{ fontSize: 'clamp(2.2rem, 5.2vw, 5.2rem)' }}>
                CARGO
              </h1>
              <p className="text-white font-semibold leading-snug mt-2" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)' }}>
                Descubre el Perú
              </p>
              <p className="text-white font-semibold leading-snug" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)' }}>
                Viaja con clase
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── MÓVIL ── */}
      {/*
        clipPath: triángulo blanco en esquina inferior izquierda
        polygon: top-left, top-right, bottom-right, punto diagonal, bottom-left
        El recorte blanco nace desde abajo-izquierda hasta un punto medio arriba
      */}
      <div
        className="sm:hidden w-full bg-[#0560c5]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 45% 100%, 0 75%)',
          paddingBottom: 24,
        }}
      >
        <div className="flex flex-row items-center w-full py-2">

          {/* Camión izquierda */}
          <div className="shrink-0" style={{ width: '52%' }}>
            <Image
              src="/images/CAMION.png"
              alt="Camión Azul Cargo"
              width={400}
              height={300}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Texto derecha */}
          <div className="flex flex-col justify-center flex-1 pr-4">
            <h1 className="text-white font-bold uppercase leading-none text-4xl">CARGO</h1>
            <p className="text-white font-semibold leading-snug mt-2 text-lg">Descubre el Perú</p>
            <p className="text-white font-semibold leading-snug text-lg">Viaja con clase</p>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════
          SECCIÓN BLANCA
      ══════════════════════════════ */}
      <div className="bg-white" style={{ paddingTop: 70 }}>

        {/* BUSCADOR */}
        <FadeIn direction="up" delay={0}>
          <div className="w-full px-4 sm:px-8 pb-65">
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="N° de Orden"
                value={orden}
                onChange={e => setOrden(e.target.value)}
                className="flex-1 border border-gray-400 rounded-2xl px-6 py-5 text-base outline-none focus:border-blue-600"
              />
              <input
                type="text"
                placeholder="Código de Orden"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                className="flex-1 border border-gray-400 rounded-2xl px-6 py-5 text-base outline-none focus:border-blue-600"
              />
              <button className="bg-[#0560c5] hover:bg-[#044da3] text-white font-bold rounded-2xl px-10 py-5 whitespace-nowrap flex items-center gap-2 transition-colors text-lg">
                Buscar <span>▶</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* NUESTROS BUCES */}
        <div className="w-full px-2 sm:px-8 pb-10">
          <FadeIn direction="up" delay={0}>
            <h2
              className="text-center leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', marginBottom: 0 }}
            >
              <span className="text-[#0560c5] italic" style={{ fontWeight: 200 }}>NUESTROS{' '}</span>
              <span className="text-[#0560c5] font-bold">BUCES</span>
            </h2>
          </FadeIn>

          {/* Buses */}
          <FadeIn direction="up" delay={0}>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-full mx-auto"
              style={{ marginTop: -8, marginBottom: 0 }}
            >
              <div className="relative w-full" style={{ paddingBottom: '42%' }}>
                <Image src="/images/BUS1.png" alt="Bus Azul" fill className="object-contain object-center" />
              </div>
              <div className="relative w-full" style={{ paddingBottom: '42%' }}>
                <Image src="/images/BUS2.png" alt="Bus Azul 2" fill className="object-contain object-center" />
              </div>
            </div>
          </FadeIn>

          {/* Servicios a Bordo */}
          <FadeIn direction="up" delay={0}>
            <div className="w-full px-2 sm:px-4" style={{ marginTop: 8 }}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pb-10 sm:pb-20 max-w-[calc(7*8rem+6*2rem)] mx-auto">
                <p className="font-bold text-base sm:text-xl text-gray-900 text-center sm:text-left w-full px-2">
                  Servicios a Bordo
                </p>
                {SERVICIOS.map(s => (
                  <div key={s.label} className="relative w-28 h-28 sm:w-32 sm:h-32">
                    <Image src={s.icon} alt={s.label} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}