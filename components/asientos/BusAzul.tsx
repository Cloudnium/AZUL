'use client';

import Image from 'next/image';

type S = 'A' | 'R';

interface BusProps {
  piso: 1 | 2;
  selected: string[];
  onSelect: (num: string) => void;
}

// ─── Azul Piso 1 — layout [2 + pasillo + 1], 11 filas ────────────────────────
const LAYOUT_P1: (S | null)[][] = [
  ['R', 'R', null, 'R'],
  ['A', 'A', null, 'A'],
  ['R', 'R', null, 'A'],
  ['A', 'A', null, 'A'],
];
const TV_P1: number[] = [0, 4, 7];

// ─── Azul Piso 2 — layout [2 + pasillo + 2], 11 filas ────────────────────────
const LAYOUT_P2: (S | null)[][] = [
  ['A','A', null, 'A','A'],
  ['A','A', null,  null, null],
  ['A','A', null, null, null],
  ['A','A', null, 'R','R'],
  ['A','A', null, 'R','R'],
  ['A','A', null, 'R','R'],
  ['A','A', null, 'A','A'],
  ['A','A', null, 'A','A'],
  ['A','A', null, 'A','A'],
  ['A','A', null, 'A','A'],
  ['A','A', null, 'A','A'],
];
const TV_P2: number[] = [0, 3, 7];

// ─── BusMap — misma estructura exacta que BusAzulPlatino ─────────────────────
function BusMap({
  layout,
  tvRows,
  selected,
  onSelect,
  busImg,
  isPiso1,
}: {
  layout: (S | null)[][];
  tvRows: number[];
  selected: string[];
  onSelect: (num: string) => void;
  busImg: string;
  isPiso1: boolean;
}) {
  let seatCounter = 0;
  const seatNumbers: (string | null)[][] = layout.map(row =>
    row.map(seat => {
      if (seat === null) return null;
      seatCounter++;
      return String(seatCounter).padStart(2, '0');
    })
  );

  const patchLeft   = '12.5%';
  const patchRight  = '12.5%';
  const patchTop    = isPiso1 ? '15.5%' : '9.5%';
  const patchBottom = '6%';
  const seatSize    = 40;

  return (
    <>
      <div className="relative flex justify-center items-start mb-10">
        <div className="relative" style={{ width: '100%', maxWidth: 280 }}>

          <Image
            src={busImg}
            alt="bus"
            width={280}
            height={640}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            priority
          />

          {/* Parche blanco */}
          <div style={{
            position: 'absolute',
            top: patchTop, bottom: patchBottom,
            left: patchLeft, right: patchRight,
            backgroundColor: '#ffffff',
            borderRadius: '0 0 18px 18px',
            zIndex: 1,
          }} />

          {/* ══════════════ PISO 1 ══════════════ */}
          {isPiso1 && (
            <div style={{
              position: 'absolute',
              top: patchTop,
              bottom: patchBottom,
              left: patchLeft,
              right: patchRight,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '32% 6px 8px 6px',
              gap: 25,
            }}>
              {/* Íconos baño + escalera */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
                padding: '0 2px',
              }}>
                <Image
                  src="/images/ASIENTOS/banio.png"
                  alt="baños"
                  width={28} height={28}
                  style={{ width: 'clamp(18px, 5vw, 28px)', height: 'clamp(18px, 5vw, 28px)', objectFit: 'contain' }}
                />
                <Image
                  src="/images/ASIENTOS/escalera.png"
                  alt="escaleras"
                  width={32} height={32}
                  style={{ width: 'clamp(20px, 5vw, 32px)', height: 'clamp(20px, 5vw, 32px)', objectFit: 'contain' }}
                />
              </div>

              {/* Grid asientos piso 1 — repeat(4, 1fr) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(4px, 2vw, 12px) 3px',
              }}>
                {layout.map((row, ri) =>
                  row.map((seat, ci) => {
                    // columna pasillo
                    if (ci === 2) {
                      return (
                        <div key={`${ri}-${ci}`} style={{
                          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: 22,
                        }}>
                          {tvRows.includes(ri) && (
                            <Image src="/images/ASIENTOS/televisor.png" alt="tv"
                              width={30} height={30}
                              style={{ width: 'clamp(20px, 5vw, 30px)', height: 'clamp(20px, 5vw, 30px)', objectFit: 'contain' }} />
                          )}
                        </div>
                      );
                    }
                    if (seat === null) return <div key={`${ri}-${ci}`} />;

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
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'transparent', border: 0, outline: 'none', padding: 0,
                          cursor: isReserved ? 'not-allowed' : 'pointer',
                          transform: isSel ? 'scale(1.06)' : 'scale(1)',
                          transition: 'transform 0.12s',
                        }}
                        aria-label={`Asiento ${num}`}
                      >
                        <Image src={imgSrc} alt={`Asiento ${num}`}
                          width={seatSize} height={seatSize}
                          style={{ width: '100%', maxWidth: seatSize, height: 'auto', objectFit: 'contain' }} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ══════════════ PISO 2 ══════════════ */}
          {!isPiso1 && (
            <div style={{
              position: 'absolute',
              top: patchTop,
              bottom: patchBottom,
              left: patchLeft,
              right: patchRight,
              zIndex: 2,
              display: 'grid',
              // 5 columnas: izq1 | izq2 | pasillo | der1 | der2
              gridTemplateColumns: '1fr 1fr 24px 1fr 1fr',
              gap: '3px',
              alignContent: 'space-evenly',
              padding: '4px 2px',
            }}>
              {layout.map((row, ri) =>
                row.map((seat, ci) => {

                  // ── Columna pasillo (ci=2): TV o vacío ──
                  if (ci === 2) {
                    return (
                      <div key={`${ri}-${ci}`} style={{
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: 22,
                      }}>
                        {tvRows.includes(ri) && (
                          <Image src="/images/ASIENTOS/televisor.png" alt="tv"
                            width={30} height={30}
                            style={{ width: 'clamp(20px, 5vw, 30px)', height: 'clamp(20px, 5vw, 30px)', objectFit: 'contain' }} />
                        )}
                      </div>
                    );
                  }

                  // ── Escalera: fila 1 col der1 (ri=1, ci=3) → span 2 filas x 2 cols ──
                  if (ri === 1 && ci === 3 && seat === null) {
                    return (
                      <div key={`${ri}-${ci}`} style={{
                        gridColumn: '4 / 6',
                        gridRow: '2 / 4',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 50,
                      }}>
                        <Image src="/images/ASIENTOS/escalera.png" alt="escaleras"
                          width={32} height={32}
                          style={{ width: 'clamp(20px, 5vw, 32px)', height: 'clamp(20px, 5vw, 32px)', objectFit: 'contain' }} />
                      </div>
                    );
                  }

                  // ── Celdas cubiertas por el span de escalera → no renderizar ──
                  if ((ri === 1 && ci === 4) || (ri === 2 && ci === 3) || (ri === 2 && ci === 4)) {
                    return null;
                  }

                  // ── Celda nula restante (ri=2, ci=1) ──
                  if (seat === null) return <div key={`${ri}-${ci}`} />;

                  // ── Asiento normal ──
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
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'transparent', border: 0, outline: 'none', padding: 0,
                        cursor: isReserved ? 'not-allowed' : 'pointer',
                        transform: isSel ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.12s',
                      }}
                      aria-label={`Asiento ${num}`}
                    >
                      <Image src={imgSrc} alt={`Asiento ${num}`}
                        width={seatSize} height={seatSize}
                        style={{ width: '100%', maxWidth: seatSize, height: 'auto', objectFit: 'contain' }} />
                    </button>
                  );
                })
              )}
            </div>
          )}

        </div>
      </div>

      {/* Separador */}
      <div style={{ width: '100%', height: 2, backgroundColor: '#ffffff', borderRadius: 2, margin: '8px 0 0 0' }} />

      {/* Leyenda */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'clamp(8px, 4vw, 24px)',
        marginTop: 20,
        flexWrap: 'wrap',
      }}>
        <Image src="/images/ASIENTOS/Recurso 603.png" alt="Disponible"
          width={0} height={0} sizes="100vw"
          style={{ height: 'clamp(36px, 8vw, 50px)', width: 'auto', display: 'block' }} />
        <Image src="/images/ASIENTOS/Recurso 604.png" alt="Reservado"
          width={0} height={0} sizes="100vw"
          style={{ height: 'clamp(36px, 8vw, 50px)', width: 'auto', display: 'block' }} />
        <Image src="/images/ASIENTOS/Recurso 606.png" alt="Tu Asiento"
          width={0} height={0} sizes="100vw"
          style={{ height: 'clamp(55px, 12vw, 78px)', width: 'auto', display: 'block', marginTop: 15 }} />
      </div>
    </>
  );
}

// ─── Export principal ─────────────────────────────────────────────────────────
export function BusAzul({ piso, selected, onSelect }: BusProps) {
  const layout = piso === 1 ? LAYOUT_P1 : LAYOUT_P2;
  const tvRows = piso === 1 ? TV_P1     : TV_P2;
  const busImg = piso === 1
    ? '/images/ASIENTOS/asientos 1.png'
    : '/images/ASIENTOS/asientos 2.png';

  return (
    <BusMap
      layout={layout}
      tvRows={tvRows}
      selected={selected}
      onSelect={onSelect}
      busImg={busImg}
      isPiso1={piso === 1}
    />
  );
}