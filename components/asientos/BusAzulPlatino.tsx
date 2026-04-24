// app/asientos/BusAzulPlatino.tsx
'use client';

import Image from 'next/image';

type S = 'A' | 'R';

interface BusProps {
  piso: 1 | 2;
  selected: string[];
  onSelect: (num: string) => void;
}

// ─── Platino Piso 1 — asientos 4.png ─────────────────────────────────────────
// 4 filas, layout [2 + pasillo + 2]
// Fila 1: azul azul | libre libre
// Fila 2: libre libre | libre libre
// Fila 3: azul azul | libre libre
// Fila 4: libre libre | gris gris
const LAYOUT_P1: (S | null)[][] = [
  ['R','R',null,'A','A'],
  ['A','A',null,'A','A'],
  ['R','R',null,'A','A'],
  ['A','A',null,'R','R'],
];
const TV_P1: number[] = []; // no hay TV en piso 1 platino

// ─── Platino Piso 2 — asientos 3.png ─────────────────────────────────────────
// 11 filas, layout [2 + pasillo + 2]
// Mirando la imagen de arriba hacia abajo:
const LAYOUT_P2: (S | null)[][] = [
  ['A','A',null,'A','A'],  // fila 0 — TV en pasillo
  ['R','R',null,'A','A'],  // fila 1
  ['R','A',null,'R','R'],  // fila 2 — escaleras derecha
  ['R','R',null,'R','R'],  // fila 3
  ['R','A',null,'R','R'],  // fila 4 — TV en pasillo
  ['R','A',null,'R','R'],  // fila 5
  ['A','A',null,'R','R'],  // fila 6
  ['A','A',null,'A','A'],  // fila 7
  ['A','A',null,'A','A'],  // fila 8 — TV en pasillo
  ['A','A',null,'A','A'],  // fila 9
  ['A','A',null,'A','A'],  // fila 10
];
const TV_P2 = [0, 4, 8];

function BusMap({
  piso,
  layout,
  tvRows,
  selected,
  onSelect,
  busImg,
}: {
  piso: 1 | 2;
  layout: (S | null)[][];
  tvRows: number[];
  selected: string[];
  onSelect: (num: string) => void;
  busImg: string;
}) {
  let seatCounter = 0;
  const seatNumbers: (string | null)[][] = layout.map(row =>
    row.map(seat => {
      if (seat === null) return null;
      seatCounter++;
      return String(seatCounter).padStart(2, '0');
    })
  );

  const colCount = layout[0]?.length ?? 4;

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

          {/* Imagen del bus */}
          <Image src={busImg} alt="bus" width={240} height={500}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            priority />

          {/* Parche blanco */}
          <div className="absolute" style={{
            top: '22%', bottom: '7%', left: '14%', right: '8%',
            backgroundColor: '#ffffff', zIndex: 1,
          }} />

          {/* Grid de asientos */}
          <div className="absolute" style={{
            top: '22%', bottom: '7%', left: '14%', right: '8%',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: '2px',
            alignContent: 'start',
            padding: '3px 2px',
          }}>
            {layout.map((row, ri) =>
              row.map((seat, ci) => {
                // Pasillo
                if (seat === null) {
                  return (
                    <div key={`${ri}-${ci}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 32 }}>
                      {tvRows.includes(ri) && (
                        <Image src="/images/ASIENTOS/Recurso 598.png" alt="tv"
                          width={14} height={14}
                          style={{ width: 14, height: 14, objectFit: 'contain' }} />
                      )}
                    </div>
                  );
                }

                const num = seatNumbers[ri][ci]!;
                const isSel = selected.includes(num);
                const isReserved = seat === 'R';

                const imgSrc = isSel
                  ? '/images/ASIENTOS/tu asiento.png'
                  : isReserved
                  ? '/images/ASIENTOS/asiento reservado.png'
                  : '/images/ASIENTOS/asiento libre.png';

                return (
                  <button key={`${ri}-${ci}`}
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
                    <Image src={imgSrc} alt={`Asiento ${num}`}
                      width={44} height={44}
                      style={{ width: '100%', maxWidth: 44, height: 'auto', objectFit: 'contain' }} />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Separador */}
      <div style={{ width: '100%', height: 2, backgroundColor: '#ffffff', borderRadius: 2, margin: '8px 0 0 0' }} />

      {/* Leyenda */}
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

export function BusAzulPlatino({ piso, selected, onSelect }: BusProps) {
  const layout  = piso === 1 ? LAYOUT_P1 : LAYOUT_P2;
  const tvRows  = piso === 1 ? TV_P1     : TV_P2;
  const busImg  = piso === 1
    ? '/images/ASIENTOS/asientos 4.png'
    : '/images/ASIENTOS/asientos 3.png';

  return (
    <BusMap
      piso={piso}
      layout={layout}
      tvRows={tvRows}
      selected={selected}
      onSelect={onSelect}
      busImg={busImg}
    />
  );
}