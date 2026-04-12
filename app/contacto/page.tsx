// app/contacto/page.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

const AZUL = '#0560c5';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', detalle: '' });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setEnviado(true); setLoading(false); }, 1000);
  };

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative w-full -mt-1 overflow-hidden">

        <Image
          src="/images/CALLCENTER.png"
          alt="Call Center"
          width={1920}
          height={700}
          priority
          className="w-full block md:h-auto md:object-[unset] h-105 object-cover object-top-left"
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(0,15,60,0.40) 0%, rgba(0,15,60,0.20) 45%, transparent 55%)',
          }}
        />

        {/* DESKTOP */}
        <div className="absolute inset-0 hidden md:flex items-center">
          <div className="absolute left-1/2 right-0 top-0 bottom-0 flex items-center pl-6 sm:pl-10">
            <div className="text-left w-full">
              <FadeIn direction="left" delay={0.1}>
                <p className="italic uppercase leading-tight" style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 100, letterSpacing: '0.12em', opacity: 0.88 }}>
                  SERVICIO DE
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.25}>
                <h1 className="uppercase leading-none" style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 7vw, 7.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginTop: '-0.25em', marginBottom: '0.5em' }}>
                  CALL CENTER
                </h1>
              </FadeIn>
              <FadeIn direction="left" delay={0.4}>
                <p className="leading-snug" style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 3vw, 3rem)', letterSpacing: '0.05em', fontWeight: 200 }}>
                  Estamos para atenderte,<br />compra y reserva tus pasajes.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* MÓVIL */}
        <div className="absolute inset-0 flex md:hidden items-center justify-center" style={{ background: 'rgba(0,15,60,0.48)' }}>
          <div className="text-center px-5">
            <FadeIn direction="up" delay={0.1}>
              <p className="italic uppercase leading-tight" style={{ color: '#fff', fontSize: 'clamp(1.2rem, 5.5vw, 1.8rem)', fontWeight: 100, letterSpacing: '0.12em', opacity: 0.88 }}>
                SERVICIO DE
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.25}>
              <h1 className="uppercase leading-none whitespace-nowrap" style={{ color: '#fff', fontSize: 'clamp(2.4rem, 12vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.01em', marginTop: '-0.05em', marginBottom: '0.3em' }}>
                CALL CENTER
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="leading-snug" style={{ color: '#fff', fontSize: 'clamp(1rem, 4.5vw, 1.4rem)', letterSpacing: '0.03em', fontWeight: 200 }}>
                Estamos para atenderte,<br />compra y reserva tus pasajes.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Sección principal: FONDO AZUL ── */}
      <div style={{ backgroundColor: AZUL }} className="relative px-6 sm:px-16 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Columna izquierda */}
          <div className="text-white flex flex-col h-full text-center md:text-left items-center md:items-start">
            <FadeIn direction="left" delay={0.1}>
              <div>
                <p className="text-4xl sm:text-5xl font-medium leading-tight mb-1">Tienes alguna</p>
                <h2 className="font-semibold text-6xl sm:text-7xl leading-none mb-10">Pregunta</h2>
                <p className="text-lg mb-5">Estamos aqui para ayudarte.</p>
                <p className="text-lg leading-relaxed">
                  Escribenos con confianza y nosotros te<br className="hidden sm:block" />
                  responderemos lo antes posible.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.3} className="flex-1 flex flex-col justify-center py-8 w-full">
              <div>
                <hr style={{ borderColor: 'rgba(255,255,255,1)', borderTopWidth: '2px' }} className="mb-8 w-3/4 mx-auto md:mx-0" />
                <div className="pl-0 md:pl-9">
                  <h4 className="text-3xl sm:text-4xl font-semibold mb-3">Dirección:</h4>
                  <p className="text-lg leading-relaxed">
                    Agencias Av. Industrial 5000,<br />Parque Tecnológico, Lima - Perú.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Formulario BLANCO */}
          <FadeIn direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl">
              <h3 className="font-bold text-2xl sm:text-3xl mb-8" style={{ color: AZUL }}>
                Déjanos tus datos:
              </h3>
              {enviado ? (
                <div className="text-center py-10" style={{ color: AZUL }}>
                  <div className="text-5xl mb-3 text-emerald-500">✔</div>
                  <p className="font-black uppercase text-2xl">¡Enviado!</p>
                  <p className="text-sm font-light mt-2 opacity-90">Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <input type="text" className="w-full border-b-2 border-[#0560c5] py-3 px-1 text-base outline-none bg-transparent placeholder-[#0560c5] text-[#0560c5] focus:border-blue-800" placeholder="Nombre:" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                  <input type="email" className="w-full border-b-2 border-[#0560c5] py-3 px-1 text-base outline-none bg-transparent placeholder-[#0560c5] text-[#0560c5] focus:border-blue-800" placeholder="E - mail:" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <input type="text" className="w-full border-b-2 border-[#0560c5] py-3 px-1 text-base outline-none bg-transparent placeholder-[#0560c5] text-[#0560c5] focus:border-blue-800" placeholder="Asunto:" value={form.asunto} onChange={e => setForm({ ...form, asunto: e.target.value })} required />
                  <textarea className="w-full border-2 border-[#0560c5] rounded-sm px-3 py-3 text-base outline-none bg-transparent placeholder-[#0560c5] text-[#0560c5] focus:border-blue-800" style={{ minHeight: 130, resize: 'none' }} placeholder="Detalle:" value={form.detalle} onChange={e => setForm({ ...form, detalle: e.target.value })} required />
                  <button type="submit" disabled={loading} style={{ backgroundColor: AZUL }} className="w-full text-white font-semibold py-4 rounded-lg uppercase tracking-widest text-xl sm:text-2xl hover:opacity-90 transition-opacity disabled:opacity-60">
                    {loading ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Línea al ras del fondo */}
        <div className="absolute bottom-0 left-0 right-0">
          <hr style={{ borderColor: '#ffffff', borderTopWidth: '3px', margin: 0 }} />
        </div>
      </div>
    </div>
  );
}