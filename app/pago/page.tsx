// app/pago/page.tsx
'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';

const METODOS = ['Yape', 'Interbank', 'VISA', 'AMEX', 'Diners', 'UnionPay'];

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

  const input = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 bg-white";
  const label = "block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1";

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-xl font-black flex items-center gap-2 mb-5">💳 Pago</h2>
            <p className="text-sm font-bold mb-3">Datos del Comprador</p>
            <div className="mb-3">
              <label className={label}>NOMBRE COMPLETO</label>
              <input className={input} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre Completo" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className={label}>TIPO DE DOCUMENTO</label>
                <select className={input} value={doc} onChange={e => setDoc(e.target.value)}>
                  <option>DNI</option><option>CE</option><option>Pasaporte</option>
                </select>
              </div>
              <div>
                <label className={label}>NÚMERO</label>
                <input className={input} value={numDoc} onChange={e => setNumDoc(e.target.value)} placeholder="00000000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className={label}>EMAIL</label>
                <input type="email" className={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div>
                <label className={label}>CONFIRMAR EMAIL</label>
                <input type="email" className={input} value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} placeholder="Email" />
              </div>
            </div>
            <p className="text-xs font-bold text-gray-500 mb-2">Elige el tipo de comprobante</p>
            <div className="flex gap-2 mb-5">
              {(['boleta', 'factura'] as const).map(c => (
                <button key={c} onClick={() => setComprobante(c)} className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all capitalize ${comprobante === c ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-600'}`}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-gray-500 mb-2">Paga con Yape, Tarjeta de Crédito o Débito</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {METODOS.map(m => (
                <button key={m} onClick={() => setMetodo(m)} className={`border-2 rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${metodo === m ? 'border-blue-700 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
                  {m}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={terminos} onChange={e => setTerminos(e.target.checked)} className="w-4 h-4" />
              Acepto los <a href="#" className="text-blue-700 font-semibold underline">Términos y condiciones</a>
            </label>
          </div>

          {/* Resumen */}
          <ResumenViaje
            variante="pago"
            asiento={asiento}
            logo={logoParam}          // ← antes era hardcodeado
            hora="10:00 PM"
            fecha="13/02/2026"
            onFinalizar={handleFinalizar}
            loadingFinalizar={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}