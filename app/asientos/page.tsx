// app/asientos/page.tsx
'use client';

import { StepsBar } from '@/components/StepsBar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type S = 'A' | 'R';

const PISO1: (S | null)[][] = [
  ['R','R',null,'A'], ['R','R',null,'A'], ['A','A',null,'A'],
  ['A','A',null,'R'], ['A','A',null,'R'], ['R','R',null,'A'],
  ['A','A',null,'A'], ['R','A',null,'A'], ['A','A',null,'A'],
  ['A','A',null,'A'], ['A','A',null,'R'],
];
const PISO2: (S | null)[][] = [
  ['R','R',null,'A'], ['A','A',null,'A'], ['A','A',null,'R'],
  ['A','A',null,'A'], ['R','R',null,'A'], ['A','A',null,'A'],
  ['A','A',null,'R'], ['A','A',null,'A'], ['A','A',null,'A'],
];

const SERVICIOS = [
  { icon: '/images/ICON-CARGADOR.png',   label: 'CARGADOR\nDE CELULAR' },
  { icon: '/images/ICON-PELICULAS.png',  label: 'PELÍCULAS\nA BORDO' },
  { icon: '/images/ICON-AIRE.png',       label: 'AIRE\nACONDICIONADO' },
  { icon: '/images/ICON-BUSCAMA.png',    label: 'BUS CAMA\n160°' },
  { icon: '/images/ICON-SEMICAMA.png',   label: 'SEMI CAMA\n145°' },
  { icon: '/images/ICON-GPS.png',        label: 'MONITOREO\nGPS' },
  { icon: '/images/ICON-BANIO.png',      label: 'BAÑO\nQUÍMICO' },
];

function ResumenCard({ asiento, piso, href }: { asiento: string | null; piso: number; href: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
      <h3 className="text-sm font-black flex items-center gap-2 mb-4">🚌 Resumen del viaje</h3>

      <div className="space-y-3 pb-4 border-b border-gray-100 mb-4">
        <div className="flex gap-2 items-start">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-700 mt-1" style={{ flexShrink: 0 }} />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">ORIGEN</p>
            <p className="text-sm font-bold">Piura, Av. bolognesi 817</p>
            <p className="text-xs text-gray-400">10:00 PM - 14 Oct</p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 mt-1" style={{ flexShrink: 0 }} />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">DESTINO</p>
            <p className="text-sm font-bold">Trujillo</p>
            <p className="text-xs text-gray-400">6:00 PM - 15 Oct</p>
          </div>
        </div>
      </div>

      {asiento && (
        <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-black">Asiento {asiento}</p>
            <p className="text-xs text-gray-400">Piso {piso}</p>
          </div>
          <p className="text-blue-700 font-black">S/ 35.00</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Total a pagar</span>
      </div>
      <p className="text-3xl font-black text-blue-700">{asiento ? 'S/ 35.00' : 'S/ 0.00'}</p>
      <p className="text-[10px] text-gray-400 mb-4">Incluye impuestos y tasas</p>

      <Link href={asiento ? href : '#'}>
        <button
          disabled={!asiento}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
        >
          CONTINUAR
        </button>
      </Link>
    </div>
  );
}

export default function AsientosPage() {
  const [piso, setPiso] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | null>('08');
  const layout = piso === 1 ? PISO1 : PISO2;

  const seatNum = (row: number, col: number) => String(row * 4 + col + 1).padStart(2, '0');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Left */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">🪑 Elige tus asientos</h2>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5 text-sm">
              <p className="font-bold text-blue-800 mb-1">ℹ Información Importante</p>
              <p className="text-gray-600 text-xs">Selecciona los asientos que desees en el mapa inferior.</p>
              <p className="text-amber-600 text-xs font-semibold mt-1">⚠ Los asientos panorámicos (segundo piso) no pueden ser ocupados por menores.</p>
            </div>

            {/* Piso tabs */}
            <div className="flex gap-2 mb-5">
              {[1, 2].map(p => (
                <button
                  key={p}
                  onClick={() => setPiso(p as 1 | 2)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${piso === p ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {p === 1 ? 'Primer Piso bus cama 160°' : 'Segundo Piso semi cama 145°'}
                </button>
              ))}
            </div>

            {/* Bus map */}
            <div className="border-2 border-blue-700 rounded-2xl p-5 mx-auto bg-gray-50" style={{ maxWidth: 300 }}>
              <div className="flex justify-between mb-3 text-lg">
                <span>🚻</span>
                <span className="text-xs text-gray-400">✏</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 mx-auto" style={{ maxWidth: 200 }}>
                {layout.map((row, ri) =>
                  row.map((seat, ci) => {
                    if (seat === null) return <div key={`${ri}-${ci}`} className="seat seat-gap" />;
                    const num = seatNum(ri, ci);
                    const isSel = num === selected;
                    return (
                      <div
                        key={`${ri}-${ci}`}
                        onClick={() => seat !== 'R' && setSelected(isSel ? null : num)}
                        className={`seat ${isSel ? 'seat-selected' : seat === 'R' ? 'seat-reserved' : 'seat-available'}`}
                      >
                        {num}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Leyenda */}
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {[
                  { cls: 'bg-white border-2 border-gray-300', label: 'Disponible', sub: 'Elige tu lugar' },
                  { cls: 'bg-gray-200',                       label: 'Reservado',  sub: 'No disponible' },
                  { cls: 'bg-blue-700',                       label: 'Tu Asiento', sub: 'Confirmar compra' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5 text-[10px]">
                    <div className={`w-4 h-4 rounded ${l.cls}`} />
                    <div>
                      <p className="font-bold text-gray-700">{l.label}</p>
                      <p className="text-gray-400">{l.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Servicios a bordo */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <h4 className="text-sm font-bold mb-3">Servicios a Bordo</h4>
              <div className="flex flex-wrap gap-4">
                {SERVICIOS.map(s => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <Image src={s.icon} alt={s.label} width={36} height={36} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                    <span className="text-[9px] font-bold text-gray-500 uppercase text-center whitespace-pre-line leading-tight" style={{ maxWidth: 60 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: resumen */}
          <ResumenCard asiento={selected} piso={piso} href={`/pasajero?asiento=${selected}&piso=${piso}`} />
        </div>
      </div>
    </div>
  );
}
