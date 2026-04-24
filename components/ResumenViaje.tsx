// components/ResumenViaje.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ResumenViajeProps {
  asiento: string | null;
  piso?: string | number;
  logo: string;
  href?: string;
  precio?: number;
  variante?: 'seleccion' | 'pago';
  // Datos del viaje reales
  origen?: string;
  destino?: string;
  terminal?: string;
  fecha?: string;
  hora?: string;         // hora de salida
  horaLlegada?: string;  // hora de llegada
  onFinalizar?: () => void;
  loadingFinalizar?: boolean;
}

export function ResumenViaje({
  asiento,
  piso,
  logo,
  href = '#',
  precio = 35,
  variante = 'seleccion',
  origen = 'Piura',
  destino = 'Trujillo',
  terminal = 'Av. Bolognesi 817',
  fecha,
  hora,
  horaLlegada,
  onFinalizar,
  loadingFinalizar = false,
}: ResumenViajeProps) {

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:sticky lg:top-20 w-full">
      {/* Título */}
      <h3 className="text-lg font-bold flex items-center gap-2 mb-5 text-gray-900">
        <Image
          src="/images/REGISTRO/Recurso 526.png"
          alt="resumen"
          width={20} height={20}
          style={{ objectFit: 'contain' }}
        />
        Resumen del viaje
      </h3>
      <div className="border-t border-gray-200 mb-5" />

      {/* Origen + Destino */}
      <div className="mb-4">
        {/* ORIGEN */}
        <div className="flex gap-3 items-start">
          <div className="flex flex-col items-center shrink-0">
            <Image
              src={
                variante === 'pago'
                  ? '/images/PAGO/Recurso 529.png'
                  : '/images/REGISTRO/Recurso 525.png'
              }
              alt="origen"
              width={14} height={14}
              style={{ objectFit: 'contain', marginTop: 2 }}
            />
            {/* Línea más larga en pago porque hay terminal debajo */}
            <div className="w-0.5 bg-gray-200" style={{ height: 58 }} />
          </div>
          <div className="pb-4">
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">ORIGEN</p>
            {/* Selección: origen + terminal en una sola línea en negrita */}
            {variante === 'seleccion' ? (
              <>
                <p className="text-base font-bold text-gray-900 leading-tight">
                  {origen}, {terminal}
                </p>
                {hora && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {hora}{fecha ? ` - ${fecha}` : ''}
                  </p>
                )}
              </>
            ) : (
              /* Pago: ciudad + terminal debajo */
              <>
                <p className="text-base font-bold text-gray-900 leading-tight">{origen}</p>
                <p className="text-sm text-gray-500 mt-0.5">{terminal}</p>
              </>
            )}
          </div>
        </div>

        {/* DESTINO */}
        <div className="flex gap-3 items-start">
          <div className="flex flex-col items-center shrink-0">
            <Image
              src={
                variante === 'pago'
                  ? '/images/PAGO/Recurso 530.png'
                  : '/images/REGISTRO/Recurso 524.png'
              }
              alt="destino"
              width={14} height={14}
              style={{ objectFit: 'contain', marginTop: 2 }}
            />
            <div className="w-0.5 bg-gray-200" style={{ height: 35 }} />
          </div>
          <div>
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">DESTINO</p>
            <p className="text-base font-bold text-gray-900 leading-tight">{destino}</p>
            {/* Selección: horaLlegada + fecha. Pago: solo horaLlegada */}
            {variante === 'seleccion' ? (
              <p className="text-sm text-gray-500 mt-0.5">
                {horaLlegada ?? '6:00 PM'}{fecha ? ` - ${fecha}` : ''}
              </p>
              ) : (
                <p className="text-sm text-gray-500 mt-0.5">{terminal}</p>
              )}
            <div className="flex items-center gap-1 mt-1">
              <Image
                src="/images/REGISTRO/Recurso 522.png"
                alt="advertencia"
                width={10} height={10}
                style={{ objectFit: 'contain' }}
              />
              <p className="text-[8px] text-gray-400">
                Horario de llegada referencial sujeto al transporte vía terrestre
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Línea separadora + Card central */}
      {variante === 'seleccion' ? (
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-[10px] text-[#185adb] font-extrabold uppercase tracking-widest mb-2">
              ASIENTOS SELECCIONADOS
            </p>
            {asiento ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Image
                    src="/images/REGISTRO/Recurso 523.png"
                    alt="asiento"
                    width={16} height={16}
                    style={{ objectFit: 'contain' }}
                  />
                  <p className="text-sm font-bold text-gray-900 flex-1">Asiento {asiento}</p>
                  <p className="text-gray-900 font-bold text-base shrink-0">S/ {precio}.00</p>
                </div>
                <div className="flex items-center gap-1 pl-6">
                  <p className="text-xs font-semibold text-gray-500">Piso {piso} •</p>
                  <Image
                    src={logo}
                    alt="logo operador"
                    width={120} height={13}
                    style={{ width: 'auto', height: 13, objectFit: 'contain' }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-400 italic">Ningún asiento seleccionado</p>
            )}
          </div>
        </div>
      ) : (
        // Variante PAGO
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <Image
              src={logo}
              alt="logo operador"
              width={120} height={22}
              style={{ width: 'auto', height: 22, objectFit: 'contain' }}
              className="mb-3"
            />
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">HORA</p>
                <div className="flex items-center gap-1.5">
                  <Image src="/images/PAGO/Recurso 528.png" alt="hora" width={14} height={14} style={{ objectFit: 'contain' }} />
                  <span className="text-xs font-bold text-gray-900">{hora ?? '10:00 PM'}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">FECHA</p>
                <div className="flex items-center gap-1.5">
                  <Image src="/images/PAGO/Recurso 482.png" alt="fecha" width={14} height={14} style={{ objectFit: 'contain' }} />
                  <span className="text-xs font-bold text-gray-900">{fecha || '—'}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">ASIENTO</p>
                <div className="flex items-center gap-1.5">
                  <Image src="/images/PAGO/Recurso 527.png" alt="asiento" width={14} height={14} style={{ objectFit: 'contain' }} />
                  <span className="text-xs font-bold text-gray-900">#{asiento}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-5 mt-1">
        <p className="text-xs text-gray-500 font-medium">Total a pagar</p>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#185adb] leading-none">
            S/ {asiento ? `${precio}.00` : '0.00'}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">Incluye impuestos y tasas</p>
        </div>
      </div>

      {/* Botón */}
      {variante === 'seleccion' ? (
        <Link href={asiento ? href : '#'}>
          <button
            disabled={!asiento}
            className="mt-4 w-full bg-[#185adb] hover:bg-[#1449b0] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-2xl tracking-widest text-sm transition-colors shadow-md shadow-[#185adb]/30"
          >
            CONTINUAR
          </button>
        </Link>
      ) : (
        <button
          onClick={onFinalizar}
          disabled={loadingFinalizar}
          className="mt-4 w-full bg-[#185adb] hover:bg-[#1449b0] disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-2xl tracking-widest text-sm transition-colors shadow-md shadow-[#185adb]/30"
        >
          {loadingFinalizar ? 'PROCESANDO...' : 'FINALIZAR'}
        </button>
      )}
    </div>
  );
}