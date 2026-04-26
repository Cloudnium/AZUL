// app/pago/page.tsx
'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';
import TerminosModal from '@/components/pago/TerminosModal';

const METODOS = [
  { label: 'Yape',      img: '/images/PAGO/Recurso 537.png' },
  { label: 'Interbank', img: '/images/PAGO/Recurso 536.png' },
  { label: 'VISA',      img: '/images/PAGO/Recurso 535.png' },
  { label: 'AMEX',      img: '/images/PAGO/Recurso 534.png' },
  { label: 'Diners',    img: '/images/PAGO/Recurso 533.png' },
  { label: 'UnionPay',  img: '/images/PAGO/Recurso 532.png' },
];

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function PagoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Datos del viaje y pasajero (vienen de pasajero/page)
  const asiento     = searchParams.get('asiento')     || '20';
  const piso        = searchParams.get('piso')        || '1';
  const logoParam   = searchParams.get('logo')        || '/images/ELIGE SERVICIO/Recurso 575.png';
  const origen      = searchParams.get('origen')      || 'Piura';
  const destino     = searchParams.get('destino')     || 'Trujillo';
  const terminal    = searchParams.get('terminal')    || 'Terminal Terrestre';
  const horaSalida  = searchParams.get('horaSalida')  || '10:00 PM';
  const horaLlegada = searchParams.get('horaLlegada') || '06:00 am';
  const precio      = searchParams.get('precio')      || '35';
  const fecha       = searchParams.get('fecha')       || '—';
  const fechaLlegada = searchParams.get('fechaLlegada') || '—';
  // Datos del pasajero pre-cargados
  const nombreParam   = searchParams.get('nombre')   || '';
  const emailParam    = searchParams.get('email')    || '';
  const docParam      = searchParams.get('doc')      || 'DNI';
  const numDocParam   = searchParams.get('dni')      || '';

  const [comprobante, setComprobante] = useState<'boleta' | 'factura'>('boleta');
  const [metodo, setMetodo]           = useState('Yape');
  const [terminos, setTerminos]       = useState(false);
  // Form — pre-cargado con datos del pasajero
  const [nombre, setNombre]           = useState(nombreParam);
  const [doc, setDoc]                 = useState(docParam);
  const [numDoc, setNumDoc]           = useState(numDocParam);
  const [email, setEmail]             = useState(emailParam);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading]         = useState(false);
  // Errores
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [modalTerminos, setModalTerminos] = useState(true); // true = abre automático

  function marcarTocado(campo: string) {
    setTouched(prev => ({ ...prev, [campo]: true }));
  }

  function getError(campo: string): string {
    if (!touched[campo]) return '';
    switch (campo) {
      case 'nombre':
        return !nombre.trim() ? 'El nombre es requerido' : '';
      case 'numDoc':
        return !numDoc.trim() ? 'El número de documento es requerido' : '';
      case 'email':
        if (!email.trim()) return 'El correo es requerido';
        if (!validarEmail(email)) return 'Correo inválido';
        return '';
      case 'confirmEmail':
        if (!confirmEmail.trim()) return 'Confirma tu correo';
        if (email !== confirmEmail) return 'Los correos no coinciden';
        return '';
      default:
        return '';
    }
  }

  // 3. Handlers
  function handleAceptarTerminos() {
    setTerminos(true);
    setModalTerminos(false);
  }

  function handleRechazarTerminos() {
    setModalTerminos(false);
    router.back(); // vuelve a página de pasajero
  }
  const handleFinalizar = async () => {
    // Marcar todos tocados
    setTouched({ nombre: true, numDoc: true, email: true, confirmEmail: true });
    if (!terminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    if (!nombre.trim() || !email.trim() || !numDoc.trim() || !confirmEmail.trim()) {
      return; // Los errores inline ya muestran el problema
    }
    if (!validarEmail(email)) return;
    if (email !== confirmEmail) return;

    setLoading(true);
    setTimeout(() => {
      router.push('/confirmacion?orden=AZ-2026-0001');
    }, 1500);
  };

  const input =
    'w-full border-2 border-gray-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 placeholder-gray-300 transition-all';
  const inputErr =
    'w-full border-2 border-red-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-red-500 bg-white text-gray-900 placeholder-gray-300 transition-all';
  const labelCls =
    'block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-24">

        {/* Steps */}
        <div className="border border-gray-200 rounded-2xl bg-white px-8 py-5 mb-6">
          <StepsBar active={4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* LEFT */}
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
                  className={touched['nombre'] && getError('nombre') ? inputErr : input}
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  onBlur={() => marcarTocado('nombre')}
                  placeholder="Nombre Completo"
                />
                {touched['nombre'] && getError('nombre') && (
                  <p className="text-red-500 text-[11px] mt-1">{getError('nombre')}</p>
                )}
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
                    className={touched['numDoc'] && getError('numDoc') ? inputErr : input}
                    value={numDoc}
                    onChange={e => setNumDoc(e.target.value)}
                    onBlur={() => marcarTocado('numDoc')}
                    placeholder="00000000"
                  />
                  {touched['numDoc'] && getError('numDoc') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('numDoc')}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className={labelCls}>EMAIL</label>
                  <input
                    type="email"
                    className={touched['email'] && getError('email') ? inputErr : input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => marcarTocado('email')}
                    placeholder="Email"
                  />
                  {touched['email'] && getError('email') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('email')}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>CONFIRMAR EMAIL</label>
                  <input
                    type="email"
                    className={touched['confirmEmail'] && getError('confirmEmail') ? inputErr : input}
                    value={confirmEmail}
                    onChange={e => setConfirmEmail(e.target.value)}
                    onBlur={() => marcarTocado('confirmEmail')}
                    placeholder="Email"
                  />
                  {touched['confirmEmail'] && getError('confirmEmail') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('confirmEmail')}</p>
                  )}
                </div>
              </div>

              {/* Comprobante toggle */}
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

              {/* Métodos de pago */}
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
                <button
                  type="button"
                  onClick={() => setModalTerminos(true)}
                  className="font-bold underline text-gray-700 bg-transparent border-none cursor-pointer p-0 text-sm"
                >
                  Términos y condiciones
                </button>
              </label>
              {!terminos && touched['nombre'] && (
                <p className="text-red-500 text-[11px] mt-1">Debes aceptar los términos y condiciones</p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-2 lg:order-2">
            <ResumenViaje
              variante="pago"
              asiento={asiento}
              piso={piso}
              logo={logoParam}
              precio={Number(precio)}
              origen={origen}
              destino={destino}
              terminal={terminal}
              hora={horaSalida}
              horaLlegada={horaLlegada}
              fecha={fecha}
              fechaLlegada={fechaLlegada}
              onFinalizar={handleFinalizar}
              loadingFinalizar={loading}
            />
          </div>
        </div>
          <TerminosModal
            open={modalTerminos}
            onAceptar={handleAceptarTerminos}
            onRechazar={handleRechazarTerminos}
            yaAceptado={terminos}  // ← nueva prop
          />
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