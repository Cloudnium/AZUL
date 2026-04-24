// components/BusMap.tsx
'use client';

import Image from 'next/image';

type S = 'A' | 'R';

interface BusMapProps {
  piso: 1 | 2;
  layout: (S | null)[][];
  selected: string[];
  onSelect: (num: string) => void;
  tvRows: number[];
  platino: boolean;
}

// ─── Layouts ──────────────────────────────────────────────────────────────────

export const LAYOUT_AZUL_P1: (S | null)[][] = [
  ['A','A',null,'A'],
  ['R','R',null,'A'],
  ['R','A',null,'A'],
  ['R','R',null,'R'],
  ['R','A',null,'R'],
  ['R','A',null,'R'],
  ['A','A',null,'R'],
  ['A','A',null,'A'],
  ['R','R',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
];
export const TV_AZUL_P1 = [0, 4, 7];

export const LAYOUT_AZUL_P2: (S | null)[][] = [
  ['A','A',null,'A'],
  ['R','R',null,'A'],
  ['R','A',null,'R'],
  ['R','R',null,'A'],
  ['R','R',null,'R'],
  ['A','A',null,'R'],
  ['A','A',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
];
export const TV_AZUL_P2 = [0, 4];

export const LAYOUT_PLATINO_P2: (S | null)[][] = [
  ['R','R',null,'R'],
  ['A','A',null,'A'],
  ['R','R',null,'A'],
  ['A','A',null,'R'],
];
export const TV_PLATINO_P2 = [0];

export const LAYOUT_PLATINO_P1: (S | null)[][] = [
  ['R','R',null,'R'],
  ['A','A',null,'A'],
  ['R','A',null,'A'],
  ['R','R',null,'R'],
  ['R','A',null,'R'],
  ['A','A',null,'A'],
  ['A','A',null,'A'],
  ['A','A',null,'R'],
];
export const TV_PLATINO_P1 = [0, 4];

// ─── Componente ───────────────────────────────────────────────────────────────
export function BusMap({ piso, layout, selected, onSelect, tvRows, platino }: BusMapProps) {
  const busImg = platino
    ? (piso === 1 ? '/images/ASIENTOS/asientos 4.png' : '/images/ASIENTOS/asientos 3.png')
    : (piso === 1 ? '/images/ASIENTOS/asientos 1.png' : '/images/ASIENTOS/asientos 2.png');

  let seatCounter = 0;
  const seatNumbers: (string | null)[][] = layout.map(row =>
    row.map(seat => {
      if (seat === null) return null;
      seatCounter++;
      return String(seatCounter).padStart(2, '0');
    })
  );

  return (
    <>
      <div className="relative flex justify-center items-start mb-10">

        {/* Iconos laterales */}
        <div className="absolute left-0 top-0 z-10">
          <Image src="/images/ASIENTOS/Recurso 592.png" alt="baños"
            width={22} height={22}
            style={{ width: 22, height: 22, objectFit: 'contain' }} />
        </div>
        <div className="absolute right-0 top-0 z-10">
          <Image src="/images/ASIENTOS/Recurso 596.png" alt="escaleras"
            width={22} height={22}
            style={{ width: 22, height: 22, objectFit: 'contain' }} />
        </div>

        <div className="relative" style={{ maxWidth: 240, width: '100%' }}>

          {/* 1️⃣ Imagen del bus */}
          <Image
            src={busImg}
            alt="bus"
            width={240}
            height={500}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            priority
          />

          {/* 2️⃣ Parche blanco sobre los asientos de la imagen */}
          <div
            className="absolute"
            style={{
              top:    platino ? '22%' : '18%',
              bottom: '7%',
              left:   '14%',
              right:  '8%',
              backgroundColor: '#ffffff',
              zIndex: 1,
            }}
          />

          {/* 3️⃣ Grid con imágenes propias de asientos */}
          <div
            className="absolute"
            style={{
              top:    platino ? '22%' : '18%',
              bottom: '7%',
              left:   '14%',
              right:  '8%',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2px',
              alignContent: 'start',
              padding: '3px 2px',
            }}
          >
            {layout.map((row, ri) =>
              row.map((seat, ci) => {
                if (seat === null) {
                  return (
                    <div key={`${ri}-${ci}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 32 }}>
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

                const num = seatNumbers[ri][ci]!;
                const isSel = selected.includes(num);
                const isReserved = seat === 'R';

                // ✅ Imágenes propias para el interior del bus
                const imgSrc = isSel
                  ? '/images/ASIENTOS/tu asiento.png'
                  : isReserved
                  ? '/images/ASIENTOS/asiento reservado.png'
                  : '/images/ASIENTOS/asiento libre.png';

                return (
                  <button
                    key={`${ri}-${ci}`}
                    onClick={() => !isReserved && onSelect(num)}
                    disabled={isReserved}
                    className="flex items-center justify-center bg-transparent border-0 outline-none p-0"
                    style={{
                      cursor: isReserved ? 'not-allowed' : 'pointer',
                      transform: isSel ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.12s',
                    }}
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

      {/* Separador */}
      <div style={{ width: '100%', height: 2, backgroundColor: '#ffffff', borderRadius: 2, margin: '8px 0 0 0' }} />

      {/* Leyenda — Recurso originales, sin cambios */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 20 }}>
        <Image src="/images/ASIENTOS/Recurso 603.png" alt="Disponible"
          width={0} height={0} sizes="100vw"
          style={{ height: 50, width: 'auto', display: 'block' }} />
        <Image src="/images/ASIENTOS/Recurso 604.png" alt="Reservado"
          width={0} height={0} sizes="100vw"
          style={{ height: 50, width: 'auto', display: 'block' }} />
        <Image src="/images/ASIENTOS/Recurso 606.png" alt="Tu Asiento"
          width={0} height={0} sizes="100vw"
          style={{ height: 78, width: 'auto', display: 'block', marginTop: 15 }} />
      </div>
    </>
  );
}