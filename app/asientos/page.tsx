// app/asientos/page.tsx
'use client';

import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
  { icon: '/images/ICON-CARGADOR.png',  label: 'CARGADOR\nDE CELULAR' },
  { icon: '/images/ICON-PELICULAS.png', label: 'PELÍCULAS\nA BORDO' },
  { icon: '/images/ICON-AIRE.png',      label: 'AIRE\nACONDICIONADO' },
  { icon: '/images/ICON-BUSCAMA.png',   label: 'BUS CAMA\n160°' },
  { icon: '/images/ICON-SEMICAMA.png',  label: 'SEMI CAMA\n145°' },
  { icon: '/images/ICON-GPS.png',       label: 'MONITOREO\nGPS' },
  { icon: '/images/ICON-BANIO.png',     label: 'BAÑO\nQUÍMICO' },
];

function AsientosContent() {
  const searchParams = useSearchParams();
  const logo = searchParams.get('logo') || '/images/ELIGE SERVICIO/Recurso 575.png';

  const [piso, setPiso] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | null>('08');
  const layout = piso === 1 ? PISO1 : PISO2;

  const seatNum = (row: number, col: number) => String(row * 4 + col + 1).padStart(2, '0');

  const href = selected
    ? `/pasajero?asiento=${selected}&piso=${piso}&logo=${encodeURIComponent(logo)}`
    : '#';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <div className="border border-gray-200 rounded-2xl bg-white px-4 sm:px-8 py-5 mb-6 overflow-x-auto">
          <StepsBar active={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* LEFT */}
          <div className="order-2 lg:order-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">🪑 Elige tus asientos</h2>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5 text-sm">
              <p className="font-bold text-blue-800 mb-1">ℹ Información Importante</p>
              <p className="text-gray-600 text-xs">Selecciona los asientos que desees en el mapa inferior.</p>
              <p className="text-amber-600 text-xs font-semibold mt-1">⚠ Los asientos panorámicos (segundo piso) no pueden ser ocupados por menores.</p>
            </div>

            <div className="flex gap-2 mb-5 flex-wrap">
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
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {[
                  { cls: 'bg-white border-2 border-gray-300', label: 'Disponible', sub: 'Elige tu lugar' },
                  { cls: 'bg-gray-200', label: 'Reservado', sub: 'No disponible' },
                  { cls: 'bg-blue-700', label: 'Tu Asiento', sub: 'Confirmar compra' },
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

          {/* RIGHT */}
          <div className="order-1 lg:order-2">
            <ResumenViaje asiento={selected} piso={piso} logo={logo} href={href} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AsientosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Cargando...</div>}>
      <AsientosContent />
    </Suspense>
  );
}