// app/busqueda/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiArrowRight } from 'react-icons/hi';
import { Pencil } from 'lucide-react';
import { MdVerified, MdAirlineSeatReclineExtra } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillBusFrontFill } from 'react-icons/bs';
import { StepsBar } from '@/components/StepsBar';

const styles = `
  :root {
    --brand:        #185adb;
    --brand-dark:   #1249b8;
    --brand-light:  #eef3fd;
    --brand-xlight: #dde8fb;
    --brand-mid:    #a8c1f5;
    --brand-text:   #185adb;
  }
`;

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
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 160, tipo: 'Sofá cama' },
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
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 145, tipo: 'Semi cama' },
  },
  {
    id: 3,
    logo: '/images/AZULPLATINO.png',
    horaSalida: '09:30', ampmSalida: 'pm',
    ciudadSalida: 'SULLANA',
    duracion: '14h 30m',
    horaLlegada: '06:30', ampmLlegada: 'am',
    ciudadLlegada: 'TRUJILLO',
    terminal: 'Terminal Perla del Chira Sullana',
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 160, tipo: 'Sofá cama' },
  },
];

function BusquedaContent() {
  const searchParams = useSearchParams();
  const origen = searchParams.get('origen') || 'Lima';
  const destino = searchParams.get('destino') || 'Piura';
  const [diaActivo, setDiaActivo] = useState(1);

  return (
    <div className="min-h-screen bg-white pb-8">
      <style>{styles}</style>

      {/* Header */}
      <div className="bg-white px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 mb-5 font-semibold mt-10">
            Inicio <span className="mx-2">›</span> Búsqueda
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-4xl font-semibold flex items-center gap-3 text-gray-900">
                {origen}
                <HiArrowRight className="w-8 h-8 stroke-2" style={{ color: 'var(--brand)' }} />
                {destino}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-semibold">Ida • 1 Pasajero</p>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all w-fit shadow-sm"
              style={{
                border: '1px solid var(--brand-mid)',
                backgroundColor: 'var(--brand-light)',
                color: 'var(--brand)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand-light)')}
            >
              MODIFICAR BÚSQUEDA
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-2">
        {/* Date selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-8">
          <button
            className="flex flex-col items-center justify-center px-3 py-1 rounded-lg border-2 border-gray-200 bg-white text-gray-800 text-4xl shrink-0 transition-all"
            style={{ minWidth: 48, minHeight: 80 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-mid)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
          >
            ‹
          </button>
          {DIAS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDiaActivo(i)}
              className="flex flex-col items-center px-6 py-1 rounded-lg border-2 transition-all shrink-0"
              style={{
                minWidth: 80,
                backgroundColor: diaActivo === i ? 'var(--brand)' : '#fff',
                color: diaActivo === i ? '#fff' : '#4b5563',
                borderColor: diaActivo === i ? 'var(--brand)' : '#e5e7eb',
              }}
              onMouseEnter={e => {
                if (diaActivo !== i) e.currentTarget.style.borderColor = 'var(--brand-mid)';
              }}
              onMouseLeave={e => {
                if (diaActivo !== i) e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <span className="text-[14px] font-bold uppercase tracking-widest">{d.day}</span>
              <span className="text-2xl font-semibold leading-tight">{d.num}</span>
              <span className="text-xs font-normal" style={{ opacity: 0.95 }}>{d.month}</span>
            </button>
          ))}
          <button
            className="flex flex-col items-center justify-center px-3 py-1 rounded-lg border-2 border-gray-200 bg-white text-gray-800 text-4xl shrink-0 transition-all"
            style={{ minWidth: 48, minHeight: 80 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-mid)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
          >
            ›
          </button>
        </div>

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={1} />
        </div>

        {/* Trip cards */}
        <div className="space-y-4 mb-12">
          {VIAJES.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border border-gray-200 px-5 py-4">

              {/* ===== CABECERA PC (oculta en móvil) ===== */}
              <div className="hidden sm:flex items-center mb-3">
                <div className="flex items-center gap-2.5 w-1/3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--brand-light)' }}
                  >
                    <BsFillBusFrontFill className="w-5 h-5" style={{ color: 'var(--brand)' }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">TRANSPORTES AZUL</p>
                    <p className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--brand)' }}>
                      <MdVerified className="w-3.5 h-3.5" /> Operador verificado
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex justify-start">
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={160}
                    height={34}
                    style={{
                      marginLeft: '-45px',
                      width: 'auto',
                      height: 34,
                      objectFit: 'contain',
                      filter: v.logo.includes('AZULPLATINO')
                        ? 'brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) brightness(50%)'
                        : 'brightness(0) saturate(100%) invert(22%) sepia(97%) saturate(1200%) hue-rotate(200deg) brightness(90%)',
                    }}
                  />
                </div>
                <div className="w-1/3 flex justify-end">
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand)',
                      border: '1px solid var(--brand-xlight)',
                    }}
                  >
                    MÁS RÁPIDO
                  </span>
                </div>
              </div>

              {/* ===== CABECERA MÓVIL (oculta en pc) ===== */}
              <div className="flex sm:hidden flex-col gap-2 mb-3">
                {/* Fila: icono + nombre + más rápido */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--brand-light)' }}
                    >
                      <BsFillBusFrontFill className="w-4 h-4" style={{ color: 'var(--brand)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">TRANSPORTES AZUL</p>
                      <p className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--brand)' }}>
                        <MdVerified className="w-3 h-3" /> Operador verificado
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0"
                    style={{
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand)',
                      border: '1px solid var(--brand-xlight)',
                    }}
                  >
                    MÁS RÁPIDO
                  </span>
                </div>
                {/* Logo centrado */}
                <div className="flex justify-center pt-1">
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={140}
                    height={30}
                    style={{
                      width: 'auto',
                      height: 30,
                      objectFit: 'contain',
                      filter: v.logo.includes('AZULPLATINO')
                        ? 'brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) brightness(50%)'
                        : 'brightness(0) saturate(100%) invert(22%) sepia(97%) saturate(1200%) hue-rotate(200deg) brightness(90%)',
                    }}
                  />
                </div>
              </div>

              {/* ===== CUERPO: pc fila | móvil columna ===== */}
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-0">

                {/* Izquierda */}
                <div className="flex-1 sm:pr-5">
                  <div className="flex items-center gap-4 mb-3 mt-5">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {v.horaSalida}<span className="text-xs font-semibold text-gray-900 ml-0.5">{v.ampmSalida}</span>
                      </span>
                      <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-wide">{v.ciudadSalida}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-[12px] text-gray-600 font-semibold mb-0.5">{v.duracion}</span>
                      <div className="flex items-center w-full gap-1">
                        <div className="flex-1 h-0.5 bg-gray-200" />
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--brand)' }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {v.horaLlegada}<span className="text-xs font-semibold text-gray-900 ml-0.5">{v.ampmLlegada}</span>
                      </span>
                      <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-wide">{v.ciudadLlegada}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <IoLocationSharp className="w-6 h-6 text-gray-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-lg font-bold text-gray-500 uppercase tracking-wide">SALIDA</p>
                      <p className="text-xl font-semibold text-gray-800">{v.terminal}</p>
                    </div>
                  </div>
                </div>

                {/* Línea vertical en pc, horizontal en móvil */}
                <div className="hidden sm:block w-0.5 bg-gray-200 mx-2 self-stretch" />
                <div className="block sm:hidden h-0.5 bg-gray-200 my-3" />

                {/* Derecha */}
                <div className="flex flex-col sm:items-end gap-1.5 sm:pl-5 shrink-0">
                  <p className="text-shadow-xs text-gray-400 sm:self-end">Desde</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-base text-gray-900"><span className="font-bold text-sm">Piso 2:</span> {v.piso2.tipo}</span>
                      <MdAirlineSeatReclineExtra className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-extrabold text-gray-400">{v.piso2.grados}°</span>
                      <span className="text-base font-bold text-gray-900">S/.{v.piso2.precio}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-base text-gray-900"><span className="font-bold text-sm">Piso 1:</span> {v.piso1.tipo}</span>
                      <MdAirlineSeatReclineExtra className="w-5 h-5 text-gray-400" />
                      <span
                        className="text-sm font-extrabold"
                        style={{ color: v.piso1.grados === 160 ? 'var(--brand)' : '#9ca3af' }}
                      >
                        {v.piso1.grados}°
                      </span>
                      <span className="text-base font-bold text-gray-900">S/.{v.piso1.precio}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500">Incluye tasas e impuestos</p>
                  <Link href={`/asientos?viajeId=${v.id}`} className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto text-white font-bold text-sm px-8 py-2.5 rounded-full transition-all tracking-wide mt-1"
                      style={{ backgroundColor: 'var(--brand)', boxShadow: '0 4px 14px 0 rgba(24,90,219,0.45)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
                    >
                      ELEGIR
                    </button>
                  </Link>
                </div>

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
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-400">Cargando...</div>}>
      <BusquedaContent />
    </Suspense>
  );
}