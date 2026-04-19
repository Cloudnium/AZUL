// app/pasajero/page.tsx
'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';

// ─── Trip summary sidebar ────────────────────────────────────────────────────
function ResumenViaje({ asiento, piso }: { asiento: string; piso: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-5 text-gray-900">
        <span className="inline-flex items-center justify-center w-8 h-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#185adb">
            <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2L7.5 3.5L6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-2H8V5h11z"/>
            <path d="M15 9H9v2h6zm3 0h-2v2h2zM15 12H9v2h6zm3 0h-2v2h2z"/>
          </svg>
        </span>
        Resumen del viaje
      </h3>

      <div className="space-y-4 pb-4 border-b border-gray-100 mb-4">
        {/* Origin */}
        <div className="flex gap-3 items-start">
          <div className="flex flex-col items-center mt-1 shrink-0">
            <div className="w-3 h-3 rounded-full border-2 border-[#185adb] bg-[#185adb]" />
            <div className="w-px h-8 bg-gray-200 my-1" />
          </div>
          <div>
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">ORIGEN</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">Piura, Av. bolognesi 817</p>
            <p className="text-sm text-gray-500 mt-0.5">10:00 PM - 14 Oct</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white" />
          </div>
          <div>
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">DESTINO</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">Trujillo</p>
            <p className="text-sm text-gray-500 mt-0.5">6:00 PM - 15 Oct</p>
            <div className="flex items-center gap-1 mt-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#185adb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-[7px] text-gray-400">Horario de llegada referencial sujeto al transporte vía terrestre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected seat */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4">
        <p className="text-[10px] text-[#185adb] font-bold uppercase tracking-widest mb-3">ASIENTOS SELECCIONADOS</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#185adb]/10 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185adb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.2 6c.4 1.1.6 2.2.6 3.4 0 6.1-3.7 11-9 11.8" />
                <path d="M15 19c-3.8 0-7-3.6-7-8V8h7v11z" />
                <path d="M8 8a4 4 0 0 1 8 0" />
                <path d="M6 19h3" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">Asiento {asiento}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-xs text-gray-400">Piso {piso} •</p>
                <div className="flex items-center gap-0.5">
                  <svg width="30" height="10" viewBox="0 0 60 18" fill="none">
                    <text x="0" y="14" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#185adb" letterSpacing="-0.5">AZUL</text>
                  </svg>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">PLATINO</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#185adb] font-black text-base">S/ 35.00</p>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-end justify-between">
        <p className="text-xs text-gray-500 font-medium">Total a pagar</p>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#185adb] leading-none">S/ 35.00</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Incluye impuestos y tasas</p>
        </div>
      </div>

      <Link href={`/pago?asiento=${asiento}&piso=${piso}`}>
        <button className="mt-5 w-full bg-[#185adb] hover:bg-[#1449b0] active:bg-[#0f3a8f] text-white font-semibold py-3.5 rounded-2xl tracking-widest text-sm transition-colors shadow-md shadow-[#185adb]/30">
          CONTINUAR
        </button>
      </Link>
    </div>
  );
}

// ─── Main content ────────────────────────────────────────────────────────────
function PasajeroContent() {
  const searchParams = useSearchParams();
  const asiento = searchParams.get('asiento') || '20';
  const piso = searchParams.get('piso') || '1';

  const [doc, setDoc] = useState('D.N.I.');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');

  // Square inputs (no border-radius) for all fields except doc/number
  const inputSquare =
    'w-full border-2 border-gray-400 rounded-none px-3.5 py-2 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 placeholder-gray-300 transition-all';
  const inputSquareReadOnly =
    'w-full border-2 border-gray-400 rounded-none px-3.5 py-2 text-sm bg-gray-50 text-gray-700 outline-none cursor-default font-semibold';

  // Labels: text-xs (slightly larger) + dark gray
  const labelBase = 'block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">

        {/* Steps bar */}
        <div className="border border-gray-200 rounded-2xl bg-white px-6 sm:px-10 py-5 mb-6 overflow-x-auto">
          <StepsBar active={3} />
        </div>

        {/* Grid: (title + form) left | sidebar right — top-aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
          {/* ── LEFT: Title + Form card ── */}
          <div>
            {/* Title — on gray background, above white card */}
            <h2 className="text-2xl font-bold flex items-center gap-2.5 mb-4 text-gray-900">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#185adb]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" >
                  <path fill="currentColor" d="m12 23l-3-3H3V2h18v18h-6zm0-11q1.45 0 2.475-1.025T15.5 8.5t-1.025-2.475T12 5T9.525 6.025T8.5 8.5t1.025 2.475T12 12m-7 6h14v-1.15q-1.35-1.325-3.137-2.087T12 14t-3.863.763T5 16.85z"/>
                </svg>
              </span>
              Registro de Pasajeros
            </h2>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <p className="text-xl font-bold text-gray-700 mb-5">Pasajero 1</p>
              {/* ✅ DOCUMENTO + NÚMERO — only these two use rounded-lg */}
              <div className="grid grid-cols-[1fr_2fr] gap-3 mb-3">
                {/* Documento select — rounded */}
                <div>
                  <label className={labelBase}>DOCUMENTO</label>
                  <div className="relative">
                    <select
                      value={doc}
                      onChange={(e) => setDoc(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 appearance-none pr-8 cursor-pointer transition-all"
                    >
                      <option>D.N.I.</option>
                      <option>CE</option>
                      <option>Pasaporte</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ✅ NÚMERO — Buscar fused inside a single rounded-lg container */}
                <div>
                  <label className={labelBase}>NÚMERO</label>
                  <div className="flex border-2 border-gray-400 rounded-lg overflow-hidden focus-within:border-[#185adb] focus-within:ring-1 focus-within:ring-[#185adb]/20 transition-all">
                    <button
                      type="button"
                      className="bg-[#BC171E] hover:bg-[#dc2626] active:bg-[#dc2626] text-white text-sm font-extrabold px-5 shrink-0 tracking-wide transition-colors"
                    >
                      Buscar
                    </button>
                    <input
                      className="flex-1 px-3.5 py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-300"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      placeholder="00000000"
                      maxLength={8}
                    />
                  </div>
                </div>
              </div>

              {/* NOMBRE COMPLETO — square */}
              <div className="mb-3">
                <label className={labelBase}>NOMBRE COMPLETO</label>
                <input
                  className={inputSquare}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre Completo"
                />
              </div>

              {/* CORREO + EDAD — square */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>CORREO</label>
                  <input
                    type="email"
                    className={inputSquare}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className={labelBase}>EDAD</label>
                  <input
                    type="number"
                    className={inputSquare}
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Edad"
                  />
                </div>
              </div>

              {/* TELÉFONO + ASIENTO — square */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>TELÉFONO</label>
                  <input
                    type="tel"
                    className={inputSquare}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono"
                  />
                </div>
                <div>
                  <label className={labelBase}>ASIENTO</label>
                  <input className={inputSquareReadOnly} value={asiento} readOnly />
                </div>
              </div>

              {/* DESTINO + EMBARQUE — square */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelBase}>DESTINO</label>
                  <input className={inputSquareReadOnly} value="LIMA - SULLANA" readOnly />
                </div>
                <div>
                  <label className={labelBase}>EMBARQUE</label>
                  <input className={inputSquareReadOnly} value="LIMA CENTRO" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <ResumenViaje asiento={asiento} piso={piso} />
        </div>
      </div>
    </div>
  );
}

export default function PasajeroPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
          Cargando...
        </div>
      }
    >
      <PasajeroContent />
    </Suspense>
  );
}