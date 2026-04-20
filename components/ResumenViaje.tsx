// components/ResumenViaje.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ResumenViajeProps {
  asiento: string | null;
  piso: string | number;
  logo: string;
  href: string;
  precio?: number;
}

export function ResumenViaje({ asiento, piso, logo, href, precio = 35 }: ResumenViajeProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:sticky lg:top-20">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-5 text-gray-900">
        <span className="inline-flex items-center justify-center w-8 h-8">
          <Image
            src="/images/REGISTRO/Recurso 526.png"
            alt="resumen"
            width={64}
            height={64}
            style={{ width: 28, height: 28, objectFit: 'contain' }}
          />
        </span>
        Resumen del viaje
      </h3>

      {/* Origen + Destino */}
      <div className="mb-4">
        {/* ORIGEN */}
        <div className="flex gap-3 items-start">
          <div className="flex flex-col items-center shrink-0">
            <Image
              src="/images/REGISTRO/Recurso 525.png"
              alt="origen"
              width={48}
              height={48}
              style={{ width: 14, height: 14, objectFit: 'contain', marginTop: 2 }}
            />
            <div className="w-0.5 bg-gray-200" style={{ height: 58 }} />
          </div>
          <div className="pb-4">
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">ORIGEN</p>
            <p className="text-base font-bold text-gray-900 leading-tight">Piura, Av. bolognesi 817</p>
            <p className="text-sm text-gray-500 mt-0.5">10:00 PM - 14 Oct</p>
          </div>
        </div>

        {/* DESTINO */}
        <div className="flex gap-3 items-start">
          <div className="flex flex-col items-center shrink-0">
            <Image
              src="/images/REGISTRO/Recurso 524.png"
              alt="destino"
              width={48}
              height={48}
              style={{ width: 14, height: 14, objectFit: 'contain', marginTop: 2 }}
            />
            <div className="w-0.5 bg-gray-200" style={{ height: 35 }} />
          </div>
          <div>
            <p className="text-[11px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">DESTINO</p>
            <p className="text-base font-bold text-gray-900 leading-tight">Trujillo</p>
            <p className="text-sm text-gray-500 mt-0.5">6:00 PM - 15 Oct</p>
            <div className="flex items-center gap-1 mt-1">
              <Image
                src="/images/REGISTRO/Recurso 522.png"
                alt="advertencia"
                width={32}
                height={32}
                style={{ width: 10, height: 10, objectFit: 'contain' }}
              />
              <p className="text-[8px] text-gray-400">Horario de llegada referencial sujeto al transporte vía terrestre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card asientos */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-4">
        <p className="text-[10px] text-[#185adb] font-extrabold uppercase tracking-widest mb-2">ASIENTOS SELECCIONADOS</p>
        {asiento ? (
          <>
            <div className="flex items-center gap-2 mb-1">
              <Image
                src="/images/REGISTRO/Recurso 523.png"
                alt="asiento"
                width={48}
                height={48}
                style={{ width: 16, height: 16, objectFit: 'contain' }}
              />
              <p className="text-sm font-bold text-gray-900 flex-1">Asiento {asiento}</p>
              <p className="text-gray-900 font-bold text-base shrink-0">S/ {precio}.00</p>
            </div>
            <div className="flex items-center gap-1 pl-6">
              <p className="text-xs font-semibold text-gray-500">Piso {piso} •</p>
              <Image
                src={logo}
                alt="logo operador"
                width={120}
                height={24}
                style={{ width: 'auto', height: 13, objectFit: 'contain' }}
              />
            </div>
          </>
        ) : (
          <p className="text-xs text-gray-400 italic">Ningún asiento seleccionado</p>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-5 mt-5">
        <p className="text-xs text-gray-500 font-medium">Total a pagar</p>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#185adb] leading-none">
            S/ {asiento ? `${precio}.00` : '0.00'}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">Incluye impuestos y tasas</p>
        </div>
      </div>

      <Link href={asiento ? href : '#'}>
        <button
          disabled={!asiento}
          className="mt-4 w-full bg-[#185adb] hover:bg-[#1449b0] active:bg-[#0f3a8f] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-2xl tracking-widest text-sm transition-colors shadow-md shadow-[#185adb]/30"
        >
          CONTINUAR
        </button>
      </Link>
    </div>
  );
}