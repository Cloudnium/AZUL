'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const DIAS = [
  { day: 'DOM', num: 14, month: 'Jul' },
  { day: 'LUN', num: 15, month: 'Jul' },
  { day: 'MAR', num: 16, month: 'Jul' },
  { day: 'MIE', num: 17, month: 'Jul' },
  { day: 'JUE', num: 18, month: 'Jul' },
];

const VIAJES = [
  {
    id: 1,
    logo: '/images/AZULPLATINO.png',
    horaSalida: '10:00', ampmSalida: 'pm',
    ciudadSalida: 'PIURA',
    duracion: '8h 00m',
    horaLlegada: '06:00', ampmLlegada: 'am',
    ciudadLlegada: 'TRUJILLO',
    terminal: 'Av. Bolognesi 817 Piura',
    piso1: 50, piso2: 35,
  },
  {
    id: 2,
    logo: '/images/LOGO.png',
    horaSalida: '10:30', ampmSalida: 'pm',
    ciudadSalida: 'TRUJILLO',
    duracion: '14h 30m',
    horaLlegada: '06:00', ampmLlegada: 'am',
    ciudadLlegada: 'PIURA',
    terminal: 'Terrapuerto Trujillo',
    piso1: 50, piso2: 35,
  },
  {
    id: 3,
    logo: '/images/LOGO.png',
    horaSalida: '09:30', ampmSalida: 'pm',
    ciudadSalida: 'SULLANA',
    duracion: '14h 30m',
    horaLlegada: '06:30', ampmLlegada: 'am',
    ciudadLlegada: 'TRUJILLO',
    terminal: 'Terminal Perla del Chira Sullana',
    piso1: 50, piso2: 35,
  },
];

function StepsBar({ active }: { active: number }) {
  const steps = ['SELECCIÓN', 'ASIENTOS', 'PASAJERO', 'PAGO'];
  return (
    <div className="flex items-center justify-center gap-0 my-6 mx-auto" style={{ maxWidth: 600 }}>
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${i + 1 <= active ? 'bg-blue-700 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
              {i + 1 < active ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${i + 1 <= active ? 'text-blue-700' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 ${i + 1 < active ? 'bg-blue-700' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );
}

function BusquedaContent() {
  const searchParams = useSearchParams();
  const origen = searchParams.get('origen') || 'Lima';
  const destino = searchParams.get('destino') || 'Piura';
  const [diaActivo, setDiaActivo] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-400 mb-1">Inicio &rsaquo; Búsqueda</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2">
                {origen} <span className="text-blue-700">→</span> {destino}
              </h1>
              <p className="text-xs text-gray-400">Ida • 1 Pasajero</p>
            </div>
            <button className="border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 hover:text-white transition-all w-fit">
              ✏ MODIFICAR BÚSQUEDA
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <StepsBar active={1} />

        {/* Date selector */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button className="text-gray-400 text-xl px-1" style={{ flexShrink: 0 }}>‹</button>
          {DIAS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDiaActivo(i)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all ${diaActivo === i ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-200'}`}
              style={{ minWidth: 70, flexShrink: 0 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wide">{d.day}</span>
              <span className="text-2xl font-black leading-tight">{d.num}</span>
              <span className="text-[10px]" style={{ opacity: 0.8 }}>{d.month}</span>
            </button>
          ))}
          <button className="text-gray-400 text-xl px-1" style={{ flexShrink: 0 }}>›</button>
        </div>

        {/* Trip cards */}
        <div className="space-y-4 mb-12">
          {VIAJES.map(v => (
            <div key={v.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
              <div className="flex flex-col sm:grid gap-4 sm:items-center" style={{ gridTemplateColumns: '180px 1fr auto auto' }}>
                {/* Operador */}
                <div className="flex sm:flex-col gap-3 sm:gap-1 items-center sm:items-start">
                  <div>
                    <p className="text-sm font-black">TRANSPORTES AZUL</p>
                    <p className="text-[10px] text-blue-700 font-bold">✔ Operador verificado</p>
                  </div>
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={90}
                    height={28}
                    style={{ width: 'auto', height: 28, objectFit: 'contain' }}
                  />
                </div>

                {/* Ruta */}
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xl font-black">{v.horaSalida}<sup className="text-xs font-semibold">{v.ampmSalida}</sup></span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{v.ciudadSalida}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-[10px] text-gray-400 font-semibold">{v.duracion}</span>
                      <div className="flex items-center w-full gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-700" style={{ flexShrink: 0 }} />
                        <div className="flex-1 h-px bg-gray-200" />
                        <div className="w-2 h-2 rounded-full bg-blue-700" style={{ flexShrink: 0 }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-black">{v.horaLlegada}<sup className="text-xs font-semibold">{v.ampmLlegada}</sup></span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{v.ciudadLlegada}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">📍 <strong>SALIDA</strong> {v.terminal}</p>
                </div>

                {/* Precios */}
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded w-fit">MÁS RÁPIDO</span>
                  <p className="text-[10px] text-gray-400">Desde</p>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <p>Piso 2: Sofá cama <strong>S/.{v.piso2}</strong></p>
                    <p>Piso 1: Sofá cama <strong>S/.{v.piso1}</strong></p>
                  </div>
                  <p className="text-[10px] text-gray-400">Incluye tasas e impuestos</p>
                </div>

                {/* Botón */}
                <Link href={`/asientos?viajeId=${v.id}`}>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">
                    ELEGIR
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusquedaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Cargando...</div>}>
      <BusquedaContent />
    </Suspense>
  );
}