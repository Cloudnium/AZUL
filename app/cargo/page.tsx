// app/cargo/page.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';

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

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div
        className="relative w-full bg-[#0560c5]"
        style={{ overflow: 'visible', height: 450 }}
      >
        {/* Fondo blanco diagonal detrás del camión */}
        <div
          className="absolute inset-y-0 left-0 bg-white"
          style={{
            width: '58%',
            clipPath: 'polygon(0 0, 90% 0, 75% 100%, 0 100%)',
            zIndex: 0,
          }}
        />

        {/* Contenido */}
        <div
          className="relative flex flex-row items-center w-full h-full"
          style={{ zIndex: 1 }}
        >
          {/* Camión — desborda hacia abajo */}
          <div
            className="relative shrink-0 w-[55%] self-end"
            style={{ marginBottom: -50 }}
          >
            <div className="relative w-full" style={{ paddingBottom: '60%' }}>
              <Image
                src="/images/CAMION.png"
                alt="Camión Azul Cargo"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Texto CARGO — centrado verticalmente en el hero */}
          <div className="flex flex-col justify-center flex-1 pr-6 sm:pr-12 lg:pr-20 h-full">
            <h1
              className="text-white font-semibold uppercase leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              CARGO
            </h1>
            <p
              className="text-white font-semibold leading-snug mt-2"
              style={{ fontSize: 'clamp(1rem, 2vw, 2rem)' }}
            >
              Descubre el Perú
            </p>
            <p
              className="text-white font-semibold leading-snug"
              style={{ fontSize: 'clamp(1rem, 2vw, 2rem)' }}
            >
              Viaja con clase
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          SECCIÓN BLANCA
      ══════════════════════════════ */}
      <div className="bg-white" style={{ paddingTop: 70 }}>

        {/* BUSCADOR */}
        <div className="w-full px-4 sm:px-8 pb-10">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="N° de Orden"
              value={orden}
              onChange={e => setOrden(e.target.value)}
              className="flex-1 border border-gray-300 rounded-2xl px-6 py-5 text-base outline-none focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Código de Orden"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              className="flex-1 border border-gray-300 rounded-2xl px-6 py-5 text-base outline-none focus:border-blue-600"
            />
            <button className="bg-[#0560c5] hover:bg-[#044da3] text-white font-bold rounded-2xl px-10 py-5 whitespace-nowrap flex items-center gap-2 transition-colors text-lg">
              Buscar <span>▶</span>
            </button>
          </div>
        </div>

        {/* NUESTROS BUCES */}
        <div className="w-full px-4 sm:px-8 pb-20">
          <h2
            className="text-center mb-10 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            <span className="text-[#0560c5] font-light italic">NUESTROS </span>
            <span className="text-[#0560c5] font-black">BUCES</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-7xl mx-auto mb-16">
            <div className="relative w-full h-56 sm:h-72 lg:h-80 xl:h-96">
              <Image src="/images/BUS1.png" alt="Bus Azul" fill className="object-contain object-center" />
            </div>
            <div className="relative w-full h-56 sm:h-72 lg:h-80 xl:h-96">
              <Image src="/images/BUS2.png" alt="Bus Azul Platino" fill className="object-contain object-center" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <p className="font-bold mb-8 uppercase tracking-widest text-xs sm:text-sm text-gray-900">
              Servicios a Bordo
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {SERVICIOS.map(s => (
                <div key={s.label} className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <Image src={s.icon} alt={s.label} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}