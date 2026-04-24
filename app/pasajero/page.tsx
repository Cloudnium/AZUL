// app/pasajero/page.tsx
'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StepsBar } from '@/components/StepsBar';
import { ResumenViaje } from '@/components/ResumenViaje';

// Validaciones
function validarDNI(dni: string) {
  return /^\d{8}$/.test(dni.trim());
}
function validarNombre(nombre: string) {
  return nombre.trim().length >= 3;
}
function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function validarEdad(edad: string) {
  const n = Number(edad);
  return n >= 1 && n <= 120;
}
function validarTelefono(tel: string) {
  return /^\d{7,15}$/.test(tel.trim());
}

function PasajeroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Datos del viaje (vienen de asientos)
  const asiento     = searchParams.get('asiento')     || '20';
  const piso        = searchParams.get('piso')        || '1';
  const logo        = searchParams.get('logo')        || '/images/ELIGE SERVICIO/Recurso 575.png';
  const origen      = searchParams.get('origen')      || 'Piura';
  const destino     = searchParams.get('destino')     || 'Trujillo';
  const terminal    = searchParams.get('terminal')    || 'Av. Bolognesi 817 Piura';
  const horaSalida  = searchParams.get('horaSalida')  || '10:00 pm';
  const horaLlegada = searchParams.get('horaLlegada') || '06:00 am';
  const precio      = searchParams.get('precio')      || '35';
  const tipo        = searchParams.get('tipo')        || 'Sofá cama';
  const fecha       = searchParams.get('fecha')       || '';

  // Estado del formulario
  const [doc, setDoc]           = useState('D.N.I.');
  const [dni, setDni]           = useState('');
  const [nombre, setNombre]     = useState('');
  const [email, setEmail]       = useState('');
  const [edad, setEdad]         = useState('');
  const [telefono, setTelefono] = useState('');

  // Errores
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function marcarTocado(campo: string) {
    setTouched(prev => ({ ...prev, [campo]: true }));
  }

  function getError(campo: string): string {
    if (!touched[campo]) return '';
    switch (campo) {
      case 'dni':
        if (!dni.trim()) return 'El número de documento es requerido';
        if (doc === 'D.N.I.' && !validarDNI(dni)) return 'El DNI debe tener 8 dígitos';
        return '';
      case 'nombre':
        if (!nombre.trim()) return 'El nombre es requerido';
        if (!validarNombre(nombre)) return 'Ingresa tu nombre completo';
        return '';
      case 'email':
        if (!email.trim()) return 'El correo es requerido';
        if (!validarEmail(email)) return 'Ingresa un correo válido';
        return '';
      case 'edad':
        if (!edad) return 'La edad es requerida';
        if (!validarEdad(edad)) return 'Ingresa una edad válida';
        return '';
      case 'telefono':
        if (!telefono.trim()) return 'El teléfono es requerido';
        if (!validarTelefono(telefono)) return 'Ingresa un teléfono válido';
        return '';
      default:
        return '';
    }
  }

  function validarTodo(): boolean {
    const campos = ['dni', 'nombre', 'email', 'edad', 'telefono'];
    const nuevos: Record<string, boolean> = {};
    campos.forEach(c => { nuevos[c] = true; });
    setTouched(nuevos);

    if (!validarNombre(nombre)) return false;
    if (!email || !validarEmail(email)) return false;
    if (!validarEdad(edad)) return false;
    if (!validarTelefono(telefono)) return false;
    if (!dni.trim()) return false;
    if (doc === 'D.N.I.' && !validarDNI(dni)) return false;
    return true;
  }

  function handleContinuar() {
    if (!validarTodo()) return;

    // Construye URL con todos los datos para pago
    const params = new URLSearchParams({
      asiento,
      piso,
      logo,
      origen,
      destino,
      terminal,
      horaSalida,
      horaLlegada,
      precio,
      tipo,
      fecha,
      // Datos del pasajero
      nombre,
      email,
      telefono,
      edad,
      doc,
      dni,
    });
    router.push(`/pago?${params.toString()}`);
  }

  const inputBase =
    'w-full border-2 rounded-lg px-3.5 py-2 text-sm outline-none bg-white text-gray-900 placeholder-gray-300 transition-all';
  const inputNormal = `${inputBase} border-gray-400 focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20`;
  const inputError  = `${inputBase} border-red-400 focus:border-red-500`;
  const inputReadOnly =
    'w-full border-2 border-gray-400 rounded-lg px-3.5 py-2 text-sm bg-gray-50 text-gray-700 outline-none cursor-default font-semibold';
  const labelBase = 'block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5';

  const href = `/pago?asiento=${asiento}&piso=${piso}&logo=${encodeURIComponent(logo)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="border border-gray-200 rounded-2xl bg-white px-4 sm:px-10 py-5 mb-6 overflow-x-auto">
          <StepsBar active={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 mb-4 text-gray-900">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0">
                <Image
                  src="/images/REGISTRO/Recurso 466.png"
                  alt="pasajero"
                  width={68}
                  height={68}
                  style={{ width: 32, height: 32, objectFit: 'contain' }}
                />
              </span>
              Registro de Pasajeros
            </h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <p className="text-lg sm:text-xl font-bold text-gray-700 mb-5">Pasajero 1</p>

              {/* DOCUMENTO + NÚMERO */}
              <div className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-3 mb-3">
                <div>
                  <label className={labelBase}>DOCUMENTO</label>
                  <div className="relative">
                    <select
                      value={doc}
                      onChange={(e) => setDoc(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3 text-sm outline-none focus:border-[#185adb] focus:ring-1 focus:ring-[#185adb]/20 bg-white text-gray-900 appearance-none pr-6 cursor-pointer transition-all"
                    >
                      <option>D.N.I.</option>
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
                  <label className={labelBase}>NÚMERO</label>
                  <div className={`flex rounded-lg overflow-hidden transition-all w-full min-w-0 border-2 ${touched['dni'] && getError('dni') ? 'border-red-400' : 'border-gray-400 focus-within:border-[#185adb]'}`}>
                    <button
                      type="button"
                      className="bg-[#BC171E] hover:bg-[#dc2626] text-white text-sm font-extrabold px-3 sm:px-5 shrink-0 tracking-wide transition-colors"
                    >
                      Buscar
                    </button>
                    <input
                      className="flex-1 min-w-0 w-0 px-2 py-2.5 sm:px-3.5 sm:py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-300"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      onBlur={() => marcarTocado('dni')}
                      placeholder="00000000"
                      maxLength={doc === 'D.N.I.' ? 8 : 12}
                    />
                  </div>
                  {touched['dni'] && getError('dni') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('dni')}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className={labelBase}>NOMBRE COMPLETO</label>
                <input
                  className={touched['nombre'] && getError('nombre') ? inputError : inputNormal}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onBlur={() => marcarTocado('nombre')}
                  placeholder="Nombre Completo"
                />
                {touched['nombre'] && getError('nombre') && (
                  <p className="text-red-500 text-[11px] mt-1">{getError('nombre')}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>CORREO</label>
                  <input
                    type="email"
                    className={touched['email'] && getError('email') ? inputError : inputNormal}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => marcarTocado('email')}
                    placeholder="correo@ejemplo.com"
                  />
                  {touched['email'] && getError('email') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('email')}</p>
                  )}
                </div>
                <div>
                  <label className={labelBase}>EDAD</label>
                  <input
                    type="number"
                    className={touched['edad'] && getError('edad') ? inputError : inputNormal}
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    onBlur={() => marcarTocado('edad')}
                    placeholder="Edad"
                    min={1}
                    max={120}
                  />
                  {touched['edad'] && getError('edad') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('edad')}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelBase}>TELÉFONO</label>
                  <input
                    type="tel"
                    className={touched['telefono'] && getError('telefono') ? inputError : inputNormal}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    onBlur={() => marcarTocado('telefono')}
                    placeholder="999 999 999"
                  />
                  {touched['telefono'] && getError('telefono') && (
                    <p className="text-red-500 text-[11px] mt-1">{getError('telefono')}</p>
                  )}
                </div>
                <div>
                  <label className={labelBase}>ASIENTO</label>
                  <input className={inputReadOnly} value={asiento} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelBase}>DESTINO</label>
                  <input className={inputReadOnly} value={`${origen} - ${destino}`} readOnly />
                </div>
                <div>
                  <label className={labelBase}>EMBARQUE</label>
                  <input className={inputReadOnly} value={terminal} readOnly />
                </div>
              </div>

              {/* Botón continuar */}
              <button
                onClick={handleContinuar}
                className="mt-6 w-full bg-[#185adb] hover:bg-[#1449b0] text-white font-semibold py-3.5 rounded-2xl tracking-widest text-sm transition-colors shadow-md shadow-[#185adb]/30"
              >
                CONTINUAR AL PAGO
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-2 lg:order-2">
            <ResumenViaje
              asiento={asiento}
              piso={piso}
              logo={logo}
              href={href}
              precio={Number(precio)}
              origen={origen}
              destino={destino}
              terminal={terminal}
              horaLlegada={horaLlegada}
              fecha={fecha}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PasajeroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">Cargando...</div>}>
      <PasajeroContent />
    </Suspense>
  );
}