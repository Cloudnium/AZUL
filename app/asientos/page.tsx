// app/asientos/page.tsx
'use client';

import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type S = 'A' | 'R';

const PISO1: (S | null)[][] = [
  ['R','R',null,'A'],
  ['R','R',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
  ['A','A',null,'R'],
  ['R','R',null,'A'],
  ['A','A',null,'A'],
  ['R','A',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
];

const PISO2: (S | null)[][] = [
  ['R','R',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
  ['A','A',null,'A'],
  ['R','R',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
  ['A','A',null,'A'],
  ['A','A',null,'A'],
];

function getServicios(platino: boolean): string[] {
  return [
    '/images/ASIENTOS/Recurso 591.png',
    '/images/ASIENTOS/Recurso 590.png',
    '/images/ASIENTOS/Recurso 589.png',
    '/images/ASIENTOS/Recurso 587.png',
    platino
      ? '/images/ASIENTOS/Recurso 588.png'
      : '/images/CARGO/Recurso 486.png',
    '/images/ASIENTOS/Recurso 586.png',
    '/images/ASIENTOS/Recurso 584.png',
  ];
}

function isPlatino(logo: string) {
  return logo.includes('575') || logo.toLowerCase().includes('platino');
}

const TV_ROWS_P1 = [0, 4, 7];
const TV_ROWS_P2 = [0, 4];

function AsientosContent() {
  const searchParams = useSearchParams();
  const logo = searchParams.get('logo') || '/images/ELIGE SERVICIO/Recurso 575.png';

  const [piso, setPiso] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | null>('08');
  const layout = piso === 1 ? PISO1 : PISO2;
  const platino = isPlatino(logo);
  const tvRows = piso === 1 ? TV_ROWS_P1 : TV_ROWS_P2;

  const busImg = platino
    ? (piso === 1 ? '/images/ASIENTOS/asientos 3.png' : '/images/ASIENTOS/asientos 4.png')
    : (piso === 1 ? '/images/ASIENTOS/asientos 1.png' : '/images/ASIENTOS/asientos 2.png');

  const tab2Label = platino
    ? 'Segundo Piso bus cama 160°'
    : 'Segundo Piso semi cama 145°';

  const seatNum = (row: number, col: number) =>
    String(row * 4 + col + 1).padStart(2, '0');

  const href = selected
    ? `/pasajero?asiento=${selected}&piso=${piso}&logo=${encodeURIComponent(logo)}`
    : '#';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-4 sm:px-8 py-5 mb-6 overflow-x-auto">
          <StepsBar active={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ===== LEFT ===== */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* TÍTULO */}
            <h2 className="text-2xl font-bold flex items-center gap-2.5 mb-4 text-gray-900">
              <Image
                src="/images/ASIENTOS/Recurso 594.png"
                alt="asiento"
                width={30} height={30}
                style={{ width: 30, height: 30, objectFit: 'contain' }}
              />
              Elige tus asientos
            </h2>

            {/* CONTENEDOR 1: Info importante */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/images/ASIENTOS/Recurso 602.png"
                  alt="info"
                  width={18} height={18}
                  style={{ width: 18, height: 18, objectFit: 'contain' }}
                />
                <p className="font-bold text-gray-900 text-base">Información Importante</p>
              </div>
              <p className="text-gray-600 font-medium text-xs mb-2">
                Selecciona los asientos que desees en el mapa inferior.
              </p>
              <div className="flex items-start gap-2">
                <Image
                  src="/images/ASIENTOS/Recurso 601.png"
                  alt="advertencia"
                  width={14} height={14}
                  style={{ width: 14, height: 14, objectFit: 'contain', marginTop: 1, flexShrink: 0 }}
                />
                <p className="text-blue-600 text-xs font-semibold">
                  Los asientos panorámicos (segundo piso) no pueden ser ocupados por menores.
                </p>
              </div>
            </div>

            {/* CONTENEDOR 2: Bus */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
              <div className="flex gap-2 mb-5 flex-wrap">
                <button
                  onClick={() => setPiso(1)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    piso === 1
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  Primer Piso bus cama 160°
                </button>
                <button
                  onClick={() => setPiso(2)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    piso === 2
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  {tab2Label}
                </button>
              </div>

              <div className="relative flex justify-center items-start mb-20">
                <div className="absolute left-0 top-0 z-10">
                  <Image
                    src="/images/ASIENTOS/Recurso 592.png"
                    alt="baños"
                    width={22} height={22}
                    style={{ width: 22, height: 22, objectFit: 'contain' }}
                  />
                </div>
                <div className="absolute right-0 top-0 z-10">
                  <Image
                    src="/images/ASIENTOS/Recurso 596.png"
                    alt="escaleras"
                    width={22} height={22}
                    style={{ width: 22, height: 22, objectFit: 'contain' }}
                  />
                </div>

                <div className="relative" style={{ maxWidth: 240, width: '100%' }}>
                  <Image
                    src={busImg}
                    alt="bus"
                    width={240}
                    height={500}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      paddingTop:    '13%',
                      paddingBottom: '6%',
                      paddingLeft:   '16%',
                      paddingRight:  '9%',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2px',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {layout.map((row, ri) =>
                        row.map((seat, ci) => {
                          if (seat === null) {
                            return (
                              <div key={`${ri}-${ci}`} className="flex items-center justify-center">
                                {tvRows.includes(ri) && (
                                  <Image
                                    src="/images/ASIENTOS/Recurso 598.png"
                                    alt="tv"
                                    width={14} height={14}
                                    style={{ width: 14, height: 14, objectFit: 'contain' }}
                                  />
                                )}
                              </div>
                            );
                          }

                          const num = seatNum(ri, ci);
                          const isSel = num === selected;
                          const imgSrc = isSel
                            ? '/images/ASIENTOS/Recurso 606.png'
                            : seat === 'R'
                            ? '/images/ASIENTOS/Recurso 604.png'
                            : '/images/ASIENTOS/Recurso 603.png';

                          return (
                            <button
                              key={`${ri}-${ci}`}
                              onClick={() => seat !== 'R' && setSelected(isSel ? null : num)}
                              disabled={seat === 'R'}
                              className="flex items-center justify-center bg-transparent border-0 outline-none p-0"
                              style={{ cursor: seat === 'R' ? 'not-allowed' : 'pointer' }}
                              aria-label={`Asiento ${num}`}
                            >
                              <Image
                                src={imgSrc}
                                alt={`Asiento ${num}`}
                                width={44} height={44}
                                style={{ width: '100%', maxWidth: 44, height: 'auto', objectFit: 'contain' }}
                              />
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Leyenda */}
              <div className="flex justify-center gap-6 mt-5 flex-wrap">
                <Image
                  src="/images/ASIENTOS/Recurso 603.png"
                  alt="Disponible"
                  width={130} height={130}
                  style={{ width: 130, height: 'auto', objectFit: 'contain' }}
                />
                <Image
                  src="/images/ASIENTOS/Recurso 604.png"
                  alt="Reservado"
                  width={150} height={150}
                  style={{ width: 150, height: 'auto', objectFit: 'contain' }}
                />
                <Image
                  src="/images/ASIENTOS/Recurso 606.png"
                  alt="Tu Asiento"
                  width={160} height={160}
                  style={{ width: 160, height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Servicios a Bordo */}
            <div className="mt-2">
              <h4 className="text-base font-bold mb-4 text-gray-900">Servicios a Bordo</h4>
              <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2">
                {getServicios(platino).map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="servicio"
                    width={72} height={72}
                    style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }}
                  />
                ))}
              </div>
            </div>

          </div>
          {/* ===== FIN LEFT ===== */}

          {/* ===== RIGHT — sticky, se queda fijo mientras el left hace scroll ===== */}
          <div className="order-2 lg:order-2">
            <ResumenViaje asiento={selected} piso={piso} logo={logo} href={href} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AsientosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
          Cargando...
        </div>
      }
    >
      <AsientosContent />
    </Suspense>
  );
}