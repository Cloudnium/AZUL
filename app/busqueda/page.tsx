// app/busqueda/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { StepsBar } from '@/components/StepsBar';
import { useDatePicker } from '@/hooks/busqueda/useDatePicker';

const styles = `
  :root {
    --brand:        #185adb;
    --brand-dark:   #1249b8;
    --brand-light:  #eef3fd;
    --brand-xlight: #dde8fb;
    --brand-mid:    #a8c1f5;
    --brand-text:   #185adb;
  }
`;

const VIAJES = [
  {
    id: 1,
    logo: '/images/ELIGE SERVICIO/Recurso 575.png',
    horaSalida: '10:00', ampmSalida: 'pm',
    ciudadSalida: 'Piura',
    duracion: '8h 00m',
    horaLlegada: '06:00', ampmLlegada: 'am',
    ciudadLlegada: 'Trujillo',
    terminal: 'Av. Bolognesi 817',
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 160, tipo: 'Sofá cama' },
  },
  {
    id: 2,
    logo: '/images/ELIGE SERVICIO/Recurso 572.png',
    horaSalida: '10:30', ampmSalida: 'pm',
    ciudadSalida: 'Trujillo',
    duracion: '14h 30m',
    horaLlegada: '06:00', ampmLlegada: 'am',
    ciudadLlegada: 'Piura',
    terminal: 'Terrapuerto Trujillo',
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 145, tipo: 'Semi cama' },
  },
  {
    id: 3,
    logo: '/images/ELIGE SERVICIO/Recurso 575.png',
    horaSalida: '09:30', ampmSalida: 'pm',
    ciudadSalida: 'Sullana',
    duracion: '14h 30m',
    horaLlegada: '06:30', ampmLlegada: 'am',
    ciudadLlegada: 'Trujillo',
    terminal: 'Terminal Perla del Chira Sullana',
    piso1: { precio: 50, grados: 160, tipo: 'Sofá cama' },
    piso2: { precio: 35, grados: 160, tipo: 'Sofá cama' },
  },
];

function BusquedaContent() {
  const searchParams = useSearchParams();
  const origen  = searchParams.get('origen')  || 'Lima';
  const destino = searchParams.get('destino') || 'Piura';
  const salida  = searchParams.get('salida')  || '';
  const regreso = searchParams.get('regreso') || '';
  const tipo    = searchParams.get('tipo')    || '';
  const esIdaVuelta = tipo === 'ida-vuelta' || (tipo === '' && !!regreso);

  const {
    dias: DIAS,
    activeIndex: diaActivo,
    setActiveIndex: setDiaActivo,
    fechaActiva,
    fechaActivaDate,
    irAtras,
    irAdelante,
  } = useDatePicker(salida);

  const fechaRegresoAjustada = (() => {
    if (!esIdaVuelta) return '';

    function parseSlash(f: string): Date {
      const [d, m, y] = f.split('/');
      const date = new Date(Number(y), Number(m) - 1, Number(d));
      date.setHours(0, 0, 0, 0);
      return date;
    }
    // Si no hay regreso original → fallback de 3 días sobre fechaActivaDate
    if (!regreso) {
      const regresoNuevo = new Date(fechaActivaDate);
      regresoNuevo.setDate(regresoNuevo.getDate() + 3);
      const dd = String(regresoNuevo.getDate()).padStart(2, '0');
      const mm = String(regresoNuevo.getMonth() + 1).padStart(2, '0');
      const yy = regresoNuevo.getFullYear();
      return `${dd}/${mm}/${yy}`;
    }
    // Lógica original intacta: mantener la diferencia relativa al mover flechas
    const salidaOrig  = salida ? parseSlash(salida) : new Date();
    salidaOrig.setHours(0, 0, 0, 0);
    const regresoOrig = parseSlash(regreso);
    const diffMs   = regresoOrig.getTime() - salidaOrig.getTime();
    const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const regresoNuevo = new Date(fechaActivaDate);
    regresoNuevo.setDate(regresoNuevo.getDate() + diffDias);
    const dd = String(regresoNuevo.getDate()).padStart(2, '0');
    const mm = String(regresoNuevo.getMonth() + 1).padStart(2, '0');
    const yy = regresoNuevo.getFullYear();
    return `${dd}/${mm}/${yy}`;
  })();

  function buildAsientosUrl(v: typeof VIAJES[0]) {
    const params = new URLSearchParams({
      viajeId:      String(v.id),
      logo:         v.logo,
      origen:       v.ciudadSalida,
      destino:      v.ciudadLlegada,
      terminal:     v.terminal,
      horaSalida:   `${v.horaSalida} ${v.ampmSalida}`,
      horaLlegada:  `${v.horaLlegada} ${v.ampmLlegada}`,
      duracion:     v.duracion,
      precio1:      String(v.piso1.precio),
      precio2:      String(v.piso2.precio),
      tipo1:        v.piso1.tipo,
      tipo2:        v.piso2.tipo,
      grados2:      String(v.piso2.grados),
      fecha:        fechaActiva,
      fechaLlegada: fechaRegresoAjustada || regreso,
    });
    return `/asientos?${params.toString()}`;
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <style>{styles}</style>

      {/* Header */}
      <div className="bg-white px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 mb-5 font-semibold mt-10">
            Inicio <span className="mx-2">›</span> Búsqueda
          </p>
          {/* MÓVIL: título + lápiz en misma fila. PC: layout original */}
          <div className="flex items-start justify-between gap-2 sm:items-center">
            <div>
              <h1 className="text-4xl font-semibold flex items-center gap-3 text-gray-900">
                {origen}
                <Image
                  src="/images/ELIGE SERVICIO/Recurso 583.png"
                  alt="flecha"
                  width={32}
                  height={32}
                  style={{ width: 32, height: 32, objectFit: 'contain' }}
                />
                {destino}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-semibold">
                {esIdaVuelta ? 'Ida y vuelta' : 'Ida'} • 1 Pasajero • {fechaActiva}
              </p>
            </div>
            <Link href={`/?origen=${origen}&destino=${destino}`} className="shrink-0">
              {/* Móvil: solo ícono */}
              <button
                className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full mt-1"
                style={{
                  border: '1px solid var(--brand-mid)',
                  backgroundColor: 'var(--brand-light)',
                  color: 'var(--brand)',
                }}
              >
                <Pencil className="w-4 h-4" />
              </button>
              {/* PC: botón completo — idéntico al original */}
              <button
                className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all w-fit shadow-sm"
                style={{
                  border: '1px solid var(--brand-mid)',
                  backgroundColor: 'var(--brand-light)',
                  color: 'var(--brand)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand-light)')}
              >
                MODIFICAR BÚSQUEDA
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-2">
        {/* Date selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-8">

          {/* Flecha izquierda — PC: tamaño original. Móvil: más compacta */}
          <button
            onClick={irAtras}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white text-gray-800 shrink-0 transition-all
                       w-9 h-16 text-2xl px-1
                       sm:w-auto sm:h-auto sm:min-w-12 sm:min-h-20 sm:text-4xl sm:px-3"
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-mid)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
          >
            ‹
          </button>

          {DIAS.map((d, i) => (
            <button
              key={d.iso}
              onClick={() => setDiaActivo(i)}
              className="flex flex-col items-center rounded-lg border-2 transition-all shrink-0
                         px-3 py-1 sm:px-6 sm:py-1"
              style={{
                minWidth: 52,
                backgroundColor: diaActivo === i ? 'var(--brand)' : '#fff',
                color: diaActivo === i ? '#fff' : '#4b5563',
                borderColor: diaActivo === i ? 'var(--brand)' : '#e5e7eb',
              }}
              onMouseEnter={e => {
                if (diaActivo !== i) e.currentTarget.style.borderColor = 'var(--brand-mid)';
              }}
              onMouseLeave={e => {
                if (diaActivo !== i) e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <span className="text-[11px] sm:text-[14px] font-bold uppercase tracking-widest">{d.day}</span>
              <span className="text-lg sm:text-2xl font-semibold leading-tight">{d.num}</span>
              <span className="text-[10px] sm:text-xs font-normal" style={{ opacity: 0.95 }}>{d.month}</span>
            </button>
          ))}

          {/* Flecha derecha — PC: tamaño original. Móvil: más compacta */}
          <button
            onClick={irAdelante}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white text-gray-800 shrink-0 transition-all
                       w-9 h-16 text-2xl px-1
                       sm:w-auto sm:h-auto sm:min-w-12 sm:min-h-20 sm:text-4xl sm:px-3"
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-mid)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
          >
            ›
          </button>
        </div>

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={1} />
        </div>

        {/* Trip cards */}
        <div className="space-y-4 mb-12">
          {VIAJES.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border border-gray-200 px-5 py-4">
              {/* ===== CABECERA PC ===== */}
              <div className="hidden sm:flex items-center mb-3">
                <div className="flex items-center gap-2.5 w-1/3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--brand-light)' }}
                  >
                    <Image
                      src="/images/ELIGE SERVICIO/Recurso 582.png"
                      alt="bus"
                      width={38}
                      height={38}
                      style={{ width: 38, height: 38, objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">TRANSPORTES AZUL</p>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/ELIGE SERVICIO/Recurso 581.png"
                        alt="Operador verificado"
                        width={160}
                        height={24}
                        style={{ width: 'auto', height: 13.8, objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-start">
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={160}
                    height={34}
                    style={{ marginLeft: '-45px', width: 'auto', height: 34, objectFit: 'contain' }}
                  />
                </div>
                <div className="w-1/3 flex justify-end">
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand)',
                      border: '1px solid var(--brand-xlight)',
                    }}
                  >
                    MÁS RÁPIDO
                  </span>
                </div>
              </div>

              {/* ===== CABECERA MÓVIL ===== */}
              <div className="flex sm:hidden flex-col gap-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--brand-light)' }}
                    >
                      <Image
                        src="/images/ELIGE SERVICIO/Recurso 582.png"
                        alt="bus"
                        width={38}
                        height={38}
                        style={{ width: 38, height: 38, objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">TRANSPORTES AZUL</p>
                      <div className="flex items-center gap-1">
                        <Image
                          src="/images/ELIGE SERVICIO/Recurso 581.png"
                          alt="Operador verificado"
                          width={160}
                          height={24}
                          style={{ width: 'auto', height: 12, objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0"
                    style={{
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand)',
                      border: '1px solid var(--brand-xlight)',
                    }}
                  >
                    MÁS RÁPIDO
                  </span>
                </div>
                <div className="flex justify-center pt-1">
                  <Image
                    src={v.logo}
                    alt="Logo"
                    width={140}
                    height={30}
                    style={{ width: 'auto', height: 30, objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* ===== CUERPO ===== */}
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-0">
                {/* Izquierda */}
                <div className="flex-1 sm:pr-5">
                  <div className="flex items-center gap-4 mb-3 mt-5">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {v.horaSalida}<span className="text-xs font-semibold text-gray-900 ml-0.5">{v.ampmSalida}</span>
                      </span>
                      <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-wide">{v.ciudadSalida}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-[12px] text-gray-600 font-semibold mb-0.5">{v.duracion}</span>
                      <div className="flex items-center w-full gap-1">
                        <div className="flex-1 h-0.5 bg-gray-200" />
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--brand)' }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {v.horaLlegada}<span className="text-xs font-semibold text-gray-900 ml-0.5">{v.ampmLlegada}</span>
                      </span>
                      <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-wide">{v.ciudadLlegada}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/images/ELIGE SERVICIO/Recurso 580.png"
                      alt="ubicación"
                      width={22}
                      height={22}
                      style={{ width: 22, height: 22, objectFit: 'contain', marginTop: 2 }}
                    />
                    <div>
                      <p className="text-lg font-bold text-gray-500 uppercase tracking-wide">SALIDA</p>
                      <p className="text-xl font-semibold text-gray-800">{v.terminal}</p>
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="hidden sm:block w-0.5 bg-gray-200 mx-2" style={{ alignSelf: 'stretch', marginTop: '-48px', marginBottom: '10px' }} />
                <div className="block sm:hidden h-0.5 bg-gray-200 my-3" />

                {/* Derecha: precios */}
                <div className="flex flex-col sm:items-end gap-1.5 sm:pl-5 shrink-0">
                  <p className="text-shadow-xs text-gray-400 sm:self-end">Desde</p>
                  <div className="space-y-1">
                    {/* Piso 2 */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-base text-gray-900">
                        <span className="font-bold text-sm">Piso 2:</span> {v.piso2.tipo}
                      </span>
                      <Image
                        src={
                          v.piso2.grados === 145
                            ? '/images/ELIGE SERVICIO/Recurso 571.png'
                            : '/images/ELIGE SERVICIO/Recurso 574.png'
                        }
                        alt={`${v.piso2.grados}°`}
                        width={290}
                        height={140}
                        style={{ width: 'auto', height: v.piso2.grados === 145 ? 30 : 20, objectFit: 'contain' }}
                      />
                      <span className="text-xl sm:text-base font-bold text-gray-900 w-14 sm:w-12 text-right">S/.{v.piso2.precio}</span>
                    </div>
                    {/* Piso 1 */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-base text-gray-900">
                        <span className="font-bold text-sm">Piso 1:</span> {v.piso1.tipo}
                      </span>
                      <Image
                        src="/images/ELIGE SERVICIO/Recurso 573.png"
                        alt="160°"
                        width={290}
                        height={140}
                        style={{ width: 'auto', height: 20, objectFit: 'contain' }}
                      />
                      <span className="text-xl sm:text-base font-bold text-gray-900 w-14 sm:w-12 text-right">S/.{v.piso1.precio}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500">Incluye tasas e impuestos</p>
                  <Link href={buildAsientosUrl(v)} className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto text-white font-bold text-sm px-8 py-2.5 rounded-full transition-all tracking-wide mt-1"
                      style={{ backgroundColor: 'var(--brand)', boxShadow: '0 4px 14px 0 rgba(24,90,219,0.45)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
                    >
                      ELEGIR
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusquedaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-400">Cargando...</div>}>
      <BusquedaContent />
    </Suspense>
  );
}