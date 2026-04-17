// app/pasajero/page.tsx
'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';

function ResumenViaje({ asiento, piso }: { asiento: string; piso: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
      <h3 className="text-sm font-black flex items-center gap-2 mb-4">🚌 Resumen del viaje</h3>
      <div className="space-y-3 pb-4 border-b border-gray-100 mb-4">
        <div className="flex gap-2 items-start">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-700 mt-1 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">ORIGEN</p>
            <p className="text-sm font-bold">Piura, Av. bolognesi 817</p>
            <p className="text-xs text-gray-400">10:00 PM - 14 Oct</p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">DESTINO</p>
            <p className="text-sm font-bold">Trujillo</p>
            <p className="text-xs text-gray-400">6:00 PM - 15 Oct</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-4">
        <div>
          <p className="text-sm font-black">Asiento {asiento}</p>
          <p className="text-xs text-gray-400">Piso {piso}</p>
        </div>
        <p className="text-blue-700 font-black">S/ 35.00</p>
      </div>
      <p className="text-3xl font-black text-blue-700">S/ 35.00</p>
      <p className="text-[10px] text-gray-400 mb-4">Incluye impuestos y tasas</p>
    </div>
  );
}

function PasajeroContent() {
  const searchParams = useSearchParams();
  const asiento = searchParams.get('asiento') || '20';
  const piso = searchParams.get('piso') || '1';
  const [doc, setDoc] = useState('DNI');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');

  const input = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 bg-white";
  const label = "block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-xl font-black flex items-center gap-2 mb-5">👤 Registro de Pasajeros</h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-bold mb-4">Pasajero 1</p>
              <div className="grid grid-cols-[1fr_2fr] gap-3 mb-3">
                <div>
                  <label className={label}>DOCUMENTO</label>
                  <select value={doc} onChange={e => setDoc(e.target.value)} className={input}>
                    <option>DNI</option><option>CE</option><option>Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className={label}>NÚMERO</label>
                  <div className="flex gap-2">
                    <input className={`${input} flex-1`} value={dni} onChange={e => setDni(e.target.value)} placeholder="00000000" maxLength={8} />
                    <button className="bg-red-600 text-white text-xs font-bold px-3 rounded-lg">Buscar</button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className={label}>NOMBRE COMPLETO</label>
                <input className={input} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre Completo" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={label}>CORREO</label>
                  <input type="email" className={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div>
                  <label className={label}>EDAD</label>
                  <input type="number" className={input} value={edad} onChange={e => setEdad(e.target.value)} placeholder="Edad" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={label}>TELÉFONO</label>
                  <input type="tel" className={input} value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
                </div>
                <div>
                  <label className={label}>ASIENTO</label>
                  <input className={`${input} bg-gray-100`} value={asiento} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>DESTINO</label>
                  <input className={`${input} bg-gray-100`} value="LIMA - SULLANA" readOnly />
                </div>
                <div>
                  <label className={label}>EMBARQUE</label>
                  <input className={`${input} bg-gray-100`} value="LIMA CENTRO" readOnly />
                </div>
              </div>
            </div>
            <Link href={`/pago?asiento=${asiento}&piso=${piso}&nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}`}>
              <button className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors">
                CONTINUAR
              </button>
            </Link>
          </div>
          <ResumenViaje asiento={asiento} piso={piso} />
        </div>
      </div>
    </div>
  );
}

export default function PasajeroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Cargando...</div>}>
      <PasajeroContent />
    </Suspense>
  );
}