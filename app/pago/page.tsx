// app/pago/page.tsx
'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';

const METODOS = [
  { label: 'Yape',      img: '/images/PAGO/Recurso 537.png' },
  { label: 'Interbank', img: '/images/PAGO/Recurso 536.png' },
  { label: 'VISA',      img: '/images/PAGO/Recurso 535.png' },
  { label: 'AMEX',      img: '/images/PAGO/Recurso 534.png' },
  { label: 'Diners',    img: '/images/PAGO/Recurso 533.png' },
  { label: 'UnionPay',  img: '/images/PAGO/Recurso 532.png' },
];

function PagoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const asiento = searchParams.get('asiento') || '20';
  const nombreParam = searchParams.get('nombre') || '';
  const logoParam = searchParams.get('logo') || '/images/AZULPLATINO.png';

  const [comprobante, setComprobante] = useState<'boleta' | 'factura'>('boleta');
  const [metodo, setMetodo] = useState('Yape');
  const [terminos, setTerminos] = useState(false);
  const [nombre, setNombre] = useState(nombreParam);
  const [doc, setDoc] = useState('DNI');
  const [numDoc, setNumDoc] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const input =
    'w-full border-2 border-gray-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 placeholder-gray-300 transition-all';
  const labelCls =
    'block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5';

  const handleFinalizar = async () => {
    if (!terminos) { alert('Debes aceptar los términos y condiciones'); return; }
    if (!nombre || !email || !numDoc) { alert('Completa todos los campos'); return; }
    if (email !== confirmEmail) { alert('Los emails no coinciden'); return; }
    setLoading(true);
    setTimeout(() => {
      router.push('/confirmacion?orden=AZ-2026-0001');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-24">

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={4} />
        </div>

        {/* grid — items-start es OBLIGATORIO para que sticky funcione */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* LEFT — título + form */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 mb-4 text-gray-900">
              <span className="inline-flex items-center justify-center w-9 h-9 shrink-0">
                <Image
                  src="/images/PAGO/Recurso 538.png"
                  alt="pago"
                  width={32}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
              </span>
              Pago
            </h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">

              <p className="text-lg sm:text-xl font-bold text-gray-700 mb-5">Datos del Comprador</p>

              <div className="mb-3">
                <label className={labelCls}>NOMBRE COMPLETO</label>
                <input
                  className={input}
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Nombre Completo"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelCls}>TIPO DE DOCUMENTO</label>
                  <div className="relative">
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 appearance-none pr-7 cursor-pointer transition-all"
                      value={doc}
                      onChange={e => setDoc(e.target.value)}
                    >
                      <option>DNI</option>
                      <option>CE</option>
                      <option>Pasaporte</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>NÚMERO</label>
                  <input
                    className={input}
                    value={numDoc}
                    onChange={e => setNumDoc(e.target.value)}
                    placeholder="00000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className={labelCls}>EMAIL</label>
                  <input
                    type="email"
                    className={input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className={labelCls}>CONFIRMAR EMAIL</label>
                  <input
                    type="email"
                    className={input}
                    value={confirmEmail}
                    onChange={e => setConfirmEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Comprobante — toggle pill */}
              <p className="text-xs font-bold text-gray-500 mb-2">Elige el tipo de comprobante</p>
              <div className="relative flex bg-gray-100 rounded-full p-1 mb-5 w-full max-w-xs">
                <span
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#BC171E] shadow transition-transform duration-200 ease-in-out ${comprobante === 'factura' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`}
                />
                {(['boleta', 'factura'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setComprobante(c)}
                    className={`relative z-10 flex-1 py-2 rounded-full text-sm font-semibold capitalize transition-colors duration-200 ${comprobante === c ? 'text-white' : 'text-gray-500'}`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>

              {/* Métodos de pago — mismo tamaño forzado */}
              <p className="text-xs font-bold text-gray-500 mb-3">Paga con Yape, Tarjeta de Crédito o Débito</p>
              <div className="flex flex-wrap gap-3 mb-5">
                {METODOS.map(m => (
                  <button
                    key={m.label}
                    onClick={() => setMetodo(m.label)}
                    className={`border-0 bg-transparent outline-none transition-all flex items-center justify-center overflow-hidden ${
                      metodo === m.label ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'
                    }`}
                    style={{ width: 100, height: 44, padding: 0, flexShrink: 0 }}
                  >
                    <Image
                      src={m.img}
                      alt={m.label}
                      width={100}
                      height={44}
                      style={{ width: 100, height: 44, objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>

              {/* Términos */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={terminos}
                  onChange={e => setTerminos(e.target.checked)}
                  className="w-4 h-4 accent-[#BC171E]"
                />
                <a href="#" className="font-bold underline text-gray-700">Términos y condiciones</a>
              </label>
            </div>
          </div>

          {/* RIGHT — el sticky está dentro de ResumenViaje, necesita este div con self-start */}
          <div className="self-start sticky top-28">
            <ResumenViaje
              variante="pago"
              asiento={asiento}
              logo={logoParam}
              hora="10:00 PM"
              fecha="13/02/2026"
              onFinalizar={handleFinalizar}
              loadingFinalizar={loading}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}