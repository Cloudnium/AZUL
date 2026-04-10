'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', detalle: '' });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const input = "w-full border-b border-blue-300 bg-transparent py-2 text-sm outline-none focus:border-blue-100 text-white placeholder-blue-200";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setEnviado(true); setLoading(false); }, 1000);
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 288 }}>
        <Image src="/images/CALLCENTER.png" alt="Call Center" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-16" style={{ background: 'rgba(30,58,138,0.6)' }}>
          <div className="text-white text-right">
            <p className="text-xl italic" style={{ opacity: 0.8 }}>SERVICIO DE</p>
            <h1 className="text-5xl font-black uppercase leading-none">CALL CENTER</h1>
            <p className="text-base mt-2" style={{ opacity: 0.9 }}>Estamos para atenderte,<br />compra y reserva tus pasajes.</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-black leading-tight">
            Tienes alguna<br />
            <span className="text-blue-700 text-4xl">Pregunta</span>
          </h2>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed font-semibold">
            Estamos aquí para ayudarte.<br />
            Escríbenos con confianza y nosotros te responderemos lo antes posible.
          </p>
          <div className="mt-6">
            <h4 className="text-blue-700 font-bold mb-1">Dirección:</h4>
            <p className="text-sm text-gray-500">
              Agencias Av. Industrial 5000,<br />Parque Tecnológico, Lima - Perú.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-blue-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-white font-bold mb-5">Déjanos tus datos:</h3>
          {enviado ? (
            <div className="text-center py-8 text-white">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-bold text-lg">¡Mensaje enviado!</p>
              <p className="text-sm mt-1" style={{ opacity: 0.8 }}>Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className={input} placeholder="Nombre:" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              <input type="email" className={input} placeholder="E-mail:" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input className={input} placeholder="Asunto:" value={form.asunto} onChange={e => setForm({...form, asunto: e.target.value})} required />
              <textarea
                className={input}
                style={{ minHeight: 96, resize: 'none' }}
                placeholder="Detalle:"
                value={form.detalle}
                onChange={e => setForm({...form, detalle: e.target.value})}
                required
              />
              <button type="submit" disabled={loading} className="w-full bg-white text-blue-700 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-blue-50 transition-colors mt-2">
                {loading ? 'ENVIANDO...' : 'ENVIAR'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
