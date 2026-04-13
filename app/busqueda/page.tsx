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

function StepsBar({ active }: { active: number }) {
  const steps = ['SELECCIÓN', 'ASIENTOS', 'PASAJERO', 'PAGO'];
  return (
    <div className="flex items-center justify-center gap-0 mx-auto w-full">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
              i + 1 <= active
                ? 'bg-blue-600 text-white border-blue-200'
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {i + 1 < active ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-bold uppercase tracking-wider hidden sm:block ${
              i + 1 <= active ? 'text-black' : 'text-gray-400'
            }`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 ${i + 1 < active ? 'bg-blue-600' : 'bg-gray-300'}`} />
          )}
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
    <div className="min-h-screen bg-white">
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
                <HiArrowRight className="text-blue-700 w-8 h-8 stroke-2" />
                {destino}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-semibold">Ida • 1 Pasajero</p>
            </div>
            <button className="flex items-center gap-2 border border-blue-300 bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-xs font-bold tracking-widest hover:bg-gray-50 transition-all w-fit shadow-sm">
              MODIFICAR BÚSQUEDA
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-2">
        {/* Date selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-8">
          <button className="flex flex-col items-center justify-center px-3 py-1 rounded-lg border-2 border-gray-200 bg-white text-gray-800 text-4xl shrink-0 hover:border-blue-300 transition-all" style={{ minWidth: 48, minHeight: 80 }}>‹</button>
          {DIAS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDiaActivo(i)}
              className={`flex flex-col items-center px-6 py-1 rounded-lg border-2 transition-all shrink-0 ${
                diaActivo === i
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
              style={{ minWidth: 80 }}
            >
              <span className="text-[14px] font-bold uppercase tracking-widest">{d.day}</span>
              <span className="text-2xl font-semibold leading-tight">{d.num}</span>
              <span className="text-xs font-normal" style={{ opacity: 0.95 }}>{d.month}</span>
            </button>
          ))}
          <button className="flex flex-col items-center justify-center px-3 py-1 rounded-lg border-2 border-gray-200 bg-white text-gray-800 text-4xl shrink-0 hover:border-blue-300 transition-all" style={{ minWidth: 48, minHeight: 80 }}>›</button>
        </div>

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={1} />
        </div>

        {/* Trip cards */}
        <div className="space-y-4 mb-12">
          {VIAJES.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border border-gray-200 px-5 py-4">

              {/* Fila superior: bus+nombre | logo centro | mas rapido */}
              <div className="flex items-center mb-3">
                <div className="flex items-center gap-2.5 w-1/3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <BsFillBusFrontFill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">TRANSPORTES AZUL</p>
                    <p className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                      <MdVerified className="w-3.5 h-3.5" /> Operador verificado
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex justify-center">
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={160}
                    height={34}
                    style={{
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
                  <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-200">MÁS RÁPIDO</span>
                </div>
              </div>

              {/* Fila inferior: horario+salida | línea | precios+botón */}
              <div className="flex items-stretch gap-0">

                {/* Izquierda */}
                <div className="flex-1 pr-5">
                  <div className="flex items-center gap-4 mb-3">
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
                        <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
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

                {/* Línea vertical */}
                <div className="w-0.5 bg-gray-200 mx-2 self-stretch" />

                {/* Derecha */}
                <div className="flex flex-col items-end gap-1.5 pl-5 shrink-0">
                  <p className="text-shadow-xs text-gray-400 font-semibold self-end">Desde</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-900 font-semibold">Piso 2: {v.piso2.tipo}</span>
                      <MdAirlineSeatReclineExtra className="w-4 h-4 text-gray-400" />
                      <span className={`text-xs font-bold ${v.piso2.grados === 160 ? 'text-blue-500' : 'text-gray-400'}`}>{v.piso2.grados}°</span>
                      <span className="text-sm font-bold text-gray-900">S/.{v.piso2.precio}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-900 font-semibold">Piso 1: {v.piso1.tipo}</span>
                      <MdAirlineSeatReclineExtra className="w-4 h-4 text-gray-400" />
                      <span className={`text-xs font-bold ${v.piso1.grados === 160 ? 'text-blue-500' : 'text-gray-400'}`}>{v.piso1.grados}°</span>
                      <span className="text-sm font-bold text-gray-900">S/.{v.piso1.precio}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400">Incluye tasas e impuestos</p>
                  <Link href={`/asientos?viajeId=${v.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-2.5 rounded-full transition-colors tracking-wide mt-1">
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