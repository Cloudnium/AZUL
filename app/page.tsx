// app/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TbCalendarRepeat } from 'react-icons/tb';
import { FaRegCalendar } from 'react-icons/fa6';
import FadeIn from '@/components/ui/FadeIn';

const DESTINOS = [
  { name: 'Trujillo', price: '35.00', img: '/images/TRUJILLO.png', badge: 'POPULAR' },
  { name: 'Piura',    price: '35.00', img: '/images/PIURA.png',    badge: null },
  { name: 'Sullana',  price: '35.00', img: '/images/SULLANA.png',  badge: null },
];

const SERVICIOS_STRIP = [
  { icon: '/images/PAGO.png',     h: 22 },
  { icon: '/images/CAMA.png',     h: 20 },
  { icon: '/images/ASIENTO.png',  h: 20 },
  { icon: '/images/CARGADOR.png', h: 24 },
  { icon: '/images/AIRE.png',     h: 22 },
  { icon: '/images/GPS.png',      h: 22 },
];

const MEJORAMOS = [
  { icon: '/images/FLOTAMODER.png' },
  { icon: '/images/MANTENIMIENTO.png' },
  { icon: '/images/MONITOREO.png' },
  { icon: '/images/AIREACON.png' },
];

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab]         = useState<'ida-vuelta' | 'solo-ida'>('ida-vuelta');
  const [origen, setOrigen]   = useState('');
  const [destino, setDestino] = useState('');
  const [salida, setSalida]   = useState('');
  const [regreso, setRegreso] = useState('');

  const handleSearch = () => {
    router.push(`/busqueda?origen=${origen}&destino=${destino}&salida=${salida}`);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh', marginTop: '-68px', paddingTop: '68px' }}>
        <div className="absolute inset-0 w-full h-full">
          <Image src="/images/FONDOINI.png" alt="Fondo" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 15%' }} priority />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
        </div>

        {/* Contenido central del hero */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center pt-24 pb-6">
          <h1 className="text-5xl sm:text-6xl font-black text-white uppercase leading-tight drop-shadow-lg mt-2">
            DESCUBRE EL PERÚ
          </h1>
          <p className="text-3xl sm:text-4xl text-white italic font-light mt-2 mb-20 drop-shadow">
            viaja seguro viaja en azul
          </p>

          {/* Search box */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl px-8 py-6">
            <div className="flex mb-4">
              <div className="inline-flex rounded-full p-1" style={{ backgroundColor: '#1a3a6b' }}>
                <button onClick={() => setTab('ida-vuelta')} className="px-5 py-1.5 rounded-full text-sm font-bold transition-all" style={{ backgroundColor: tab === 'ida-vuelta' ? '#0560c5' : 'transparent', color: '#fff' }}>
                  Ida y vuelta
                </button>
                <button onClick={() => setTab('solo-ida')} className="px-5 py-1.5 rounded-full text-sm font-bold transition-all" style={{ backgroundColor: tab === 'solo-ida' ? '#0560c5' : 'transparent', color: tab === 'solo-ida' ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                  Solo ida
                </button>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-end">
              <div className="flex-1 min-w-30">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">ORIGEN</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11">
                  <Image src="/images/UBICACION.png" alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  <input className="w-full text-sm outline-none bg-transparent text-gray-700" value={origen} onChange={e => setOrigen(e.target.value)} placeholder="Lima" />
                </div>
              </div>

              <div className="flex-1 min-w-30">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">DESTINO</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11">
                  <Image src="/images/DESTINO.png" alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  <input className="w-full text-sm outline-none bg-transparent text-gray-700" value={destino} onChange={e => setDestino(e.target.value)} placeholder="Piura" />
                </div>
              </div>

              <div className="flex-1 min-w-30">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">SALIDA</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11 overflow-hidden">
                  <FaRegCalendar size={17} style={{ color: '#0560c5', flexShrink: 0 }} />
                  <input type="date" className="w-full text-sm outline-none bg-transparent text-gray-700 cursor-pointer" value={salida} onChange={e => setSalida(e.target.value)} style={{ colorScheme: 'light', minWidth: 0 }} />
                </div>
              </div>

              {tab === 'ida-vuelta' && (
                <div className="flex-1 min-w-30">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">REGRESO</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11 overflow-hidden">
                    <TbCalendarRepeat size={18.5} style={{ color: '#0560c5', flexShrink: 0 }} />
                    <input type="date" className="w-full text-sm outline-none bg-transparent text-gray-700 cursor-pointer" value={regreso} onChange={e => setRegreso(e.target.value)} style={{ colorScheme: 'light', minWidth: 0 }} />
                  </div>
                </div>
              )}

              <div className={`self-end ${tab === 'ida-vuelta' ? 'w-full sm:w-auto' : 'shrink-0'}`}>
                <button onClick={handleSearch} className={`h-11 rounded-xl flex items-center justify-center transition-colors hover:opacity-90 ${tab === 'ida-vuelta' ? 'w-full sm:w-12' : 'w-12'}`} style={{ backgroundColor: '#0560c5' }}>
                  <Image src="/images/BUSCAR.png" alt="Buscar" width={22} height={22} style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Banner nueva flota */}
          <div className="rounded-2xl w-full max-w-5xl mt-8 overflow-hidden">
            {/* Móvil: altura automática para no recortar */}
            <div className="block sm:hidden w-full">
              <Image src="/images/NUEVAFLOTA2026.png" alt="Nueva Flota 2026" width={800} height={200} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {/* PC: altura fija como antes */}
            <div className="hidden sm:block w-full" style={{ height: 'clamp(100px, 28vw, 200px)' }}>
              <Image src="/images/NUEVAFLOTA2026.png" alt="Nueva Flota 2026" width={800} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          </div>
        </div>

        {/* SERVICIOS STRIP — dentro del hero, sobre el fondo */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-4">
          {/* Móvil */}
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:hidden px-2">
            {SERVICIOS_STRIP.map((s, i) => (
              <div key={i} className="flex items-center justify-start gap-2">
                <Image src={s.icon} alt={`servicio-${i}`} width={110} height={s.h} style={{ height: s.h, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          {/* PC */}
          <div className="hidden sm:flex flex-row items-center justify-between gap-3 flex-nowrap w-full">
            {SERVICIOS_STRIP.map((s, i) => (
              <div key={i} className="flex-1 flex items-center justify-center">
                <Image src={s.icon} alt={`servicio-${i}`} width={110} height={s.h} style={{ height: s.h, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* TÍTULO DESTINOS — al final del hero */}
        <div className="relative z-10 w-full mt-auto">
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: 160, background: 'linear-gradient(to bottom, transparent 0%, #0a1628 100%)', pointerEvents: 'none' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8 pt-40">
            <FadeIn direction="up">
              <p id="destinos" className="text-sm sm:text-xl font-semibold uppercase tracking-widest mb-2" style={{ color: '#0560c5', scrollMarginTop: '152px' }}>
                NUESTROS DESTINOS
              </p>
              <h2 className="text-5xl sm:text-6xl font-semibold text-white">Destinos del Norte</h2>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== DESTINOS CARDS ===== */}
      <section
        style={{
          background: 'linear-gradient(to bottom, #0a1628 0%, #050d1a 50%, #000 100%)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}
        className="pt-8 pb-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DESTINOS.map((d, index) => (
              <FadeIn key={d.name} delay={index * 0.15} direction="up">
                <div
                  key={d.name}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ height: 280 }}
                >
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.4s ease' }}
                    className="group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.35) 50%, transparent 75%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {d.badge && (
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide block w-fit mb-2"
                        style={{ backgroundColor: '#0560c5' }}
                      >
                        {d.badge}
                      </span>
                    )}
                    <div className="text-3xl font-semibold leading-tight">{d.name}</div>
                    <div className="text-sm mb-3 opacity-80">Desde S/ {d.price}</div>
                    <Link href={`/busqueda?origen=Lima&destino=${d.name}`}>
                      <button className="text-white text-xs font-semibold flex items-center gap-1 hover:opacity-75 transition-opacity">
                        RESERVAR →
                      </button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEJORAMOS ===== */}
      <section
        className="bg-black py-12 px-6 pb-12 text-center"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
      >
        <FadeIn direction="up">
          <h2 className="text-5xl font-semibold text-white uppercase tracking-wide">MEJORAMOS</h2>
          <p className="text-white text-2xl mt-2 mb-14">Constantemente para ti</p>
        </FadeIn>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16">
          {/* NUEVA FLOTA 2026 */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/images/NV2026.png"
              alt="Nueva Flota 2026"
              width={170}
              height={170}
              style={{ width: 170, height: 170, objectFit: 'contain' }}
            />
          </div>

          {/* Íconos en fila */}
          <div className="flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
            {MEJORAMOS.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div key={i} className="flex flex-col items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={`mejora-${i}`}
                    width={120}
                    height={120}
                    style={{ width: 120, height: 120, objectFit: 'contain' }}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}