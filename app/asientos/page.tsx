// app/asientos/page.tsx
'use client';

import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BusAzulPlatino } from '@/components/asientos/BusAzulPlatino';
import { BusAzul } from '@/components/asientos/BusAzul';

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

function AsientosContent() {
  const searchParams = useSearchParams();

  // Datos del viaje que vienen de búsqueda
  const logo         = searchParams.get('logo')        || '/images/ELIGE SERVICIO/Recurso 575.png';
  const origen       = searchParams.get('origen')      || 'Piura';
  const destino      = searchParams.get('destino')     || 'Trujillo';
  const terminal     = searchParams.get('terminal')    || 'Av. Bolognesi 817';
  const horaSalida   = searchParams.get('horaSalida')  || '10:00 pm';
  const horaLlegada  = searchParams.get('horaLlegada') || '06:00 am';
  const duracion     = searchParams.get('duracion')    || '8h 00m';
  const precio1      = searchParams.get('precio1')     || '50';
  const precio2      = searchParams.get('precio2')     || '35';
  const tipo1        = searchParams.get('tipo1')       || 'Sofá cama';
  const tipo2        = searchParams.get('tipo2')       || 'Sofá cama';
  const grados2      = searchParams.get('grados2')     || '160';
  const fecha        = searchParams.get('fecha')       || '';

  const [piso, setPiso]       = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string[]>(['08']);

  const platino = isPlatino(logo);

  const tab2Label = platino
    ? 'Segundo Piso Bus cama 160°'
    : `Segundo Piso Semi cama ${grados2}°`;

  function handleSelect(num: string) {
    setSelected(prev =>
      prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]
    );
  }

  const firstSelected = selected[0] ?? null;

  // Precio según piso seleccionado
  const precioActual = piso === 1 ? precio1 : precio2;

  // URL hacia pasajero con TODOS los datos
  const href = firstSelected
    ? `/pasajero?${new URLSearchParams({
        asiento:     selected.join(','),
        piso:        String(piso),
        logo,
        origen,
        destino,
        terminal,
        horaSalida,
        horaLlegada,
        duracion,
        precio:      precioActual,
        tipo:        piso === 1 ? tipo1 : tipo2,
        fecha,
      }).toString()}`
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

            {/* Info importante */}
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
                <p style={{ color: '#185adb' }} className="text-xs font-semibold">
                  Los asientos panorámicos (segundo piso) no pueden ser ocupados por menores.
                </p>
              </div>
            </div>

            {/* Bus */}
            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-5 mb-4"
              style={{ boxShadow: 'inset 0 2px 12px 0 rgba(255,255,255,0.7)' }}>

              {/* Tabs piso */}
              <div className="flex gap-2 mb-5 flex-wrap">
                <button
                  onClick={() => setPiso(1)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    piso === 1 ? 'text-white' : 'bg-white text-gray-500 border-gray-200'
                  }`}
                  style={piso === 1 ? { backgroundColor: '#185adb', borderColor: '#185adb' } : {}}
                >
                  Primer Piso <span className="font-semibold text-xs">Bus Cama 160°</span>
                </button>
                <button
                  onClick={() => setPiso(2)}
                  className={`flex items-center px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    piso === 2 ? 'text-white' : 'bg-white text-gray-500 border-gray-200'
                  }`}
                  style={piso === 2 ? { backgroundColor: '#185adb', borderColor: '#185adb' } : {}}
                >
                  {tab2Label.split(' ')[0]}&nbsp;{tab2Label.split(' ')[1]}&nbsp;
                  <span className="font-semibold text-xs">{tab2Label.split(' ').slice(2).join(' ')}</span>
                </button>
              </div>

              {platino ? (
                <BusAzulPlatino
                  piso={piso}
                  selected={selected}
                  onSelect={handleSelect}
                />
              ) : (
                <BusAzul
                  piso={piso}
                  selected={selected}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>

          {/* ===== RIGHT ===== */}
          <div className="order-2 lg:order-2">
            <ResumenViaje
              asiento={firstSelected}
              piso={piso}
              logo={logo}
              href={href}
              precio={Number(precioActual)}
              origen={origen}
              destino={destino}
              terminal={terminal}
              hora={horaSalida}
              horaLlegada={horaLlegada}
              fecha={fecha}
            />
          </div>
        </div>

        {/* Servicios a Bordo */}
        <div className="mt-2" style={{ clear: 'both', position: 'relative', zIndex: 0 }}>
          <h4 className="text-base font-bold mb-4 text-gray-900">Servicios a Bordo</h4>
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 16,
            overflowX: 'auto',
            paddingBottom: 8,
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {getServicios(platino).map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: 115, height: 115 }}>
                <Image src={src} alt="servicio" width={115} height={115}
                  style={{ width: 115, height: 115, objectFit: 'contain', display: 'block' }} />
              </div>
            ))}
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