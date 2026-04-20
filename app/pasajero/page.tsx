// app/pasajero/page.tsx
'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';

function PasajeroContent() {
  const searchParams = useSearchParams();
  const asiento = searchParams.get('asiento') || '20';
  const piso = searchParams.get('piso') || '1';
  const logo = searchParams.get('logo') || '/images/ELIGE SERVICIO/Recurso 575.png';

  const [doc, setDoc] = useState('D.N.I.');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');

  const inputSquare =
    'w-full border-2 border-gray-400 rounded-none px-3.5 py-2 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 placeholder-gray-300 transition-all';
  const inputSquareReadOnly =
    'w-full border-2 border-gray-400 rounded-none px-3.5 py-2 text-sm bg-gray-50 text-gray-700 outline-none cursor-default font-semibold';
  const labelBase = 'block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5';

  const href = `/pago?asiento=${asiento}&piso=${piso}&logo=${encodeURIComponent(logo)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="border border-gray-200 rounded-2xl bg-white px-4 sm:px-10 py-5 mb-6 overflow-x-auto">
          <StepsBar active={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 mb-4 text-gray-900">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0">
                <Image
                  src="/images/REGISTRO/Recurso 466.png"
                  alt="pasajero"
                  width={68}
                  height={68}
                  style={{ width: 32, height: 32, objectFit: 'contain' }}
                />
              </span>
              Registro de Pasajeros
            </h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <p className="text-lg sm:text-xl font-bold text-gray-700 mb-5">Pasajero 1</p>

              {/* DOCUMENTO + NÚMERO — fix responsive */}
              <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[1fr_2fr] gap-3 mb-3">
                <div>
                  <label className={labelBase}>DOCUMENTO</label>
                  <div className="relative">
                    <select
                      value={doc}
                      onChange={(e) => setDoc(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 appearance-none pr-6 cursor-pointer transition-all"
                    >
                      <option>D.N.I.</option>
                      <option>CE</option>
                      <option>Pasaporte</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelBase}>NÚMERO</label>
                  <div className="flex border-2 border-gray-400 rounded-lg overflow-hidden focus-within:border-[#185adb] focus-within:ring-1 focus-within:ring-[#185adb]/20 transition-all">
                    <button
                      type="button"
                      className="bg-[#BC171E] hover:bg-[#dc2626] text-white text-sm font-extrabold px-3 sm:px-5 shrink-0 tracking-wide transition-colors"
                    >
                      Buscar
                    </button>
                    <input
                      className="flex-1 min-w-0 px-2 py-2.5 sm:px-3.5 sm:py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-300"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      placeholder="00000000"
                      maxLength={8}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className={labelBase}>NOMBRE COMPLETO</label>
                <input
                  className={inputSquare}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre Completo"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>CORREO</label>
                  <input type="email" className={inputSquare} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div>
                  <label className={labelBase}>EDAD</label>
                  <input type="number" className={inputSquare} value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>TELÉFONO</label>
                  <input type="tel" className={inputSquare} value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
                </div>
                <div>
                  <label className={labelBase}>ASIENTO</label>
                  <input className={inputSquareReadOnly} value={asiento} readOnly />
                </div>
              </div>

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

          {/* RIGHT */}
          <div className="order-1 lg:order-2">
            <ResumenViaje asiento={asiento} piso={piso} logo={logo} href={href} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PasajeroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">Cargando...</div>}>
      <PasajeroContent />
    </Suspense>
  );
}