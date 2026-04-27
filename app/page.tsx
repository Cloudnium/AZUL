// app/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/ui/FadeIn';

const DESTINOS = [
  { name: 'Trujillo', price: '35.00', img: '/images/inicio/Recurso 549.png', badge: 'POPULAR' },
  { name: 'Piura',    price: '35.00', img: '/images/inicio/Recurso 551.png',    badge: null },
  { name: 'Sullana',  price: '35.00', img: '/images/inicio/Recurso 550.png',  badge: null },
];

const SERVICIOS_STRIP = [
  { icon: '/images/inicio/Recurso 545.png', h: 22 },
  { icon: '/images/inicio/Recurso 568.png', h: 20 },
  { icon: '/images/inicio/Recurso 543.png', h: 20 },
  { icon: '/images/inicio/Recurso 546.png', h: 24 },
  { icon: '/images/inicio/Recurso 547.png', h: 22 },
  { icon: '/images/inicio/Recurso 544.png', h: 22 },
];

const MEJORAMOS = [
  { icon: '/images/inicio/Recurso 557.png' },
  { icon: '/images/inicio/Recurso 556.png' },
  { icon: '/images/inicio/Recurso 555.png' },
  { icon: '/images/inicio/Recurso 548.png' },
];

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab]         = useState<'ida-vuelta' | 'solo-ida'>('ida-vuelta');
  const [origen, setOrigen]   = useState('');
  const [destino, setDestino] = useState('');
  const [salida, setSalida]   = useState('');
  const [regreso, setRegreso] = useState('');
  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  .toISOString().split('T')[0];
  const [errorRegreso, setErrorRegreso] = useState(false);

  const handleSearch = () => {
    if (tab === 'ida-vuelta' && salida && !regreso) {
      setErrorRegreso(true);
      return;
    }
    setErrorRegreso(false);

    let fechaFormateada = salida;
    if (salida) {
      const [anio, mes, dia] = salida.split('-');
      fechaFormateada = `${dia}/${mes}/${anio}`;
    }

    const params = new URLSearchParams({
      origen,
      destino,
      salida: fechaFormateada,
      tipo: tab,
    });

    if (tab === 'ida-vuelta' && regreso) {
      const [anio, mes, dia] = regreso.split('-');
      params.set('regreso', `${dia}/${mes}/${anio}`);
    }
    router.push(`/busqueda?${params.toString()}`);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh', marginTop: '-68px', paddingTop: '68px' }}>
        <div className="absolute inset-0 w-full h-full">
          <Image src="/images/inicio/Recurso 570.png" alt="Fondo" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 15%' }} priority />
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
                  <Image src="/images/inicio/Recurso 559.png" alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  <input className="w-full text-sm outline-none bg-transparent text-gray-700" value={origen} onChange={e => setOrigen(e.target.value)} placeholder="Lima" />
                </div>
              </div>

              <div className="flex-1 min-w-30">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">DESTINO</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11">
                  <Image src="/images/inicio/Recurso 564.png" alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  <input className="w-full text-sm outline-none bg-transparent text-gray-700" value={destino} onChange={e => setDestino(e.target.value)} placeholder="Piura" />
                </div>
              </div>

              <div className="flex-1 min-w-30">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">SALIDA</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 h-11 overflow-hidden">
                  <Image src="/images/inicio/Recurso 562.png" alt="" width={17} height={17} style={{ width: 17, height: 17, objectFit: 'contain' }} />
                  <input type="date" className="w-full text-sm outline-none bg-transparent text-gray-700 cursor-pointer" value={salida} onChange={e => setSalida(e.target.value)} min={today} style={{ colorScheme: 'light', minWidth: 0 }} />
                </div>
              </div>

              {tab === 'ida-vuelta' && (
                <div className="flex-1 min-w-30" style={{ position: 'relative' }}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 text-left">REGRESO</label>
                  <div className={`flex items-center gap-2 rounded-xl px-3 h-11 overflow-hidden border ${errorRegreso ? 'border-red-400' : 'border-gray-200'}`}>
                    <Image src="/images/inicio/Recurso 560.png" alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                    <input type="date" className="w-full text-sm outline-none bg-transparent text-gray-700 cursor-pointer" value={regreso} onChange={e => { setRegreso(e.target.value); setErrorRegreso(false); }} min={salida || today} style={{ colorScheme: 'light', minWidth: 0 }} />
                  </div>
                  {/* Error solo PC — flota debajo sin mover nada */}
                  {errorRegreso && (
                    <p className="text-red-500 text-xs hidden sm:block" style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 2 }}>
                      Ingresa una fecha de regreso.
                    </p>
                  )}
                </div>
              )}

              {/* Botón solo PC — dentro del flex */}
              <div className={`self-end hidden sm:block ${tab === 'ida-vuelta' ? 'w-auto' : 'shrink-0'}`}>
                <button onClick={handleSearch} className="h-11 w-12 rounded-xl flex items-center justify-center transition-colors hover:opacity-90" style={{ backgroundColor: '#0560c5' }}>
                  <Image src="/images/inicio/Recurso 558.png" alt="Buscar" width={22} height={22} style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
                </button>
              </div>
            </div>

            {/* Error solo móvil — debajo del flex, ANTES del botón */}
            {tab === 'ida-vuelta' && errorRegreso && (
              <p className="text-red-500 text-xs mt-2 sm:hidden">
                Ingresa una fecha de regreso.
              </p>
            )}

            {/* Botón solo móvil — fuera del flex, siempre abajo */}
            <div className="sm:hidden mt-3">
              <button onClick={handleSearch} className="h-11 w-full rounded-xl flex items-center justify-center transition-colors hover:opacity-90" style={{ backgroundColor: '#0560c5' }}>
                <Image src="/images/inicio/Recurso 558.png" alt="Buscar" width={22} height={22} style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
              </button>
            </div>
          </div>

          {/* Banner nueva flota */}
          <div className="rounded-2xl w-full max-w-5xl mt-8 overflow-hidden">
            <div className="block sm:hidden w-full">
              <Image src="/images/inicio/Recurso 565.png" alt="Nueva Flota 2026" width={800} height={200} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="hidden sm:block w-full" style={{ height: 'clamp(100px, 28vw, 200px)' }}>
              <Image src="/images/inicio/Recurso 565.png" alt="Nueva Flota 2026" width={800} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          </div>
        </div>

        {/* SERVICIOS STRIP */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:hidden px-2">
            {SERVICIOS_STRIP.map((s, i) => (
              <div key={i} className="flex items-center justify-start gap-2">
                <Image src={s.icon} alt={`servicio-${i}`} width={110} height={s.h} style={{ height: s.h, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <div className="hidden sm:flex flex-row items-center justify-between gap-3 flex-nowrap w-full">
            {SERVICIOS_STRIP.map((s, i) => (
              <div key={i} className="flex-1 flex items-center justify-center">
                <Image src={s.icon} alt={`servicio-${i}`} width={110} height={s.h} style={{ height: s.h, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* TÍTULO DESTINOS */}
        <div className="relative z-10 w-full mt-auto">
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 160, background: 'linear-gradient(to bottom, transparent 0%, #0a1628 100%)', pointerEvents: 'none' }} />
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
        style={{ background: 'linear-gradient(to bottom, #0a1628 0%, #050d1a 50%, #000 100%)', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}
        className="pt-8 pb-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DESTINOS.map((d, index) => (
              <FadeIn key={d.name} delay={index * 0.15} direction="up">
                <div className="relative rounded-2xl overflow-hidden cursor-pointer group" style={{ height: 280 }}>
                  <Image src={d.img} alt={d.name} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.4s ease' }} className="group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.35) 50%, transparent 75%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {d.badge && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide block w-fit mb-2" style={{ backgroundColor: '#0560c5' }}>
                        {d.badge}
                      </span>
                    )}
                    <div className="text-3xl font-semibold leading-tight">{d.name}</div>
                    <div className="text-sm mb-3 opacity-80">Desde S/ {d.price}</div>
                    <Link href={`/busqueda?origen=Lima&destino=${d.name}`}>
                      <button className="text-white text-xs font-semibold flex items-center gap-1 hover:opacity-75 transition-opacity">RESERVAR →</button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEJORAMOS ===== */}
      <section className="bg-black py-12 px-6 pb-12 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <FadeIn direction="up">
          <h2 className="text-5xl font-semibold text-white uppercase tracking-wide">MEJORAMOS</h2>
          <p className="text-white text-2xl mt-2 mb-14">Constantemente para ti</p>
        </FadeIn>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16">
          <div className="shrink-0 flex items-center justify-center">
            <Image src="/images/inicio/Recurso 569.png" alt="Nueva Flota 2026" width={170} height={170} style={{ width: 170, height: 170, objectFit: 'contain' }} />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
            {MEJORAMOS.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="flex flex-col items-center justify-center">
                  <Image src={item.icon} alt={`mejora-${i}`} width={120} height={120} style={{ width: 120, height: 120, objectFit: 'contain' }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}