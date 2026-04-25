'use client';

import Image from 'next/image';

type S = 'A' | 'R';

interface BusProps {
  piso: 1 | 2;
  selected: string[];
  onSelect: (num: string) => void;
}

const LAYOUT_P1: (S | null)[][] = [
  ['R', 'R', null, 'R'],
  ['A', 'A', null, 'A'],
  ['R', 'R', null, 'A'],
  ['A', 'A', null, 'A'],
];
const TV_P1: number[] = [0];

const LAYOUT_P2: (S | null)[][] = [
  ['A', 'A', null, 'A'],
  ['R', 'R', null, null],
  ['R', 'A', null, null],
  ['R', 'R', null, 'R'],
  ['R', 'A', null, 'R'],
  ['R', 'A', null, 'R'],
  ['A', 'A', null, 'R'],
  ['A', 'A', null, 'A'],
  ['A', 'A', null, 'A'],
  ['A', 'A', null, 'A'],
  ['A', 'A', null, 'A'],
];
const TV_P2: number[] = [0, 4, 8];
const ESCALERA_ROW_P2 = 2;

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
  showBano: boolean;
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

  const patchLeft   = isPiso1 ? '12.5%' : '12.5%';
  const patchRight  = isPiso1 ? '12.5%' : '12.5%';
  const patchTop    = isPiso1 ? '15.5%' : '9.5%';
  const patchBottom = isPiso1 ? '6%'    : '6%';
  const seatSize    = isPiso1 ? 40      : 40;

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

          {/* PISO 1 */}
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

              {/* Grid asientos piso 1 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(4px, 2vw, 12px) 3px',
              }}>
                {layout.map((row, ri) =>
                  row.map((seat, ci) => {
                    if (ci === 2) {
                      return (
                        <div key={`${ri}-${ci}`} style={{
                          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: 22
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

          {/* PISO 2 */}
          {!isPiso1 && (
            <div style={{
              position: 'absolute',
              top: patchTop,
              bottom: patchBottom,
              left: patchLeft,
              right: patchRight,
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '3px',
              alignContent: 'space-evenly',
              padding: '4px 2px',
            }}>
              {layout.map((row, ri) =>
                row.map((seat, ci) => {
                  if (ci === 2) {
                    const showTv = tvRows.includes(ri);
                    return (
                      <div key={`${ri}-${ci}`} style={{
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: 22
                      }}>
                        {showTv && (
                          <Image src="/images/ASIENTOS/televisor.png" alt="tv"
                            width={30} height={30}
                            style={{ width: 'clamp(20px, 5vw, 30px)', height: 'clamp(20px, 5vw, 30px)', objectFit: 'contain' }} />
                        )}
                      </div>
                    );
                  }

                  if (ci === 3 && ri === ESCALERA_ROW_P2 && seat === null) {
                    return (
                      <div key={`${ri}-${ci}`} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-36px'
                      }}>
                        <Image src="/images/ASIENTOS/escalera.png" alt="escaleras"
                          width={32} height={32}
                          style={{ width: 'clamp(20px, 5vw, 32px)', height: 'clamp(20px, 5vw, 32px)', objectFit: 'contain' }} />
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

export function BusAzulPlatino({ piso, selected, onSelect }: BusProps) {
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
      showBano={piso === 1}
      isPiso1={piso === 1}
    />
  );
}