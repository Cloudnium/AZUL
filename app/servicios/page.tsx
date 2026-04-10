'use client';
import Image from 'next/image';

const SERVICIOS = [
  { icon: '/images/platino/CARGADOR.png',        label: 'Cargador\nde Celular' },
  { icon: '/images/platino/PELICULASABORDO.png',  label: 'Películas\na Bordo' },
  { icon: '/images/platino/AIREACON.png',         label: 'Aire\nAcondicionado' },
  { icon: '/images/platino/BUSCAMA.png',          label: 'Bus cama\n160°' },
  { icon: '/images/platino/SEMICAMA.png',         label: 'Semi cama\n145°' },
  { icon: '/images/platino/GPS.png',              label: 'Monitoreo\nGPS' },
  { icon: '/images/platino/PAGOSEGURO.png',       label: 'Pago\nseguro' },
  { icon: '/images/platino/BANOQUIMICO.png',      label: 'Baño\nquimico' },
];

export default function ServiciosPage() {
  return (
    <div>
      {/* Hero bus */}
      <div className="relative overflow-hidden" style={{ height: 288 }}>
        <Image
          src="/images/BUSPLATINO.png"
          alt="Azul Platino"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Info */}
      <div
        className="px-4 py-14 text-center"
        style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #1d4ed8)' }}
      >
        <Image
          src="/images/AZULPLATINO.png"
          alt="Azul Platino"
          width={200}
          height={60}
          style={{ width: 'auto', height: 60, filter: 'brightness(0) invert(1)', margin: '0 auto 1rem' }}
        />
        <h2 className="text-white text-4xl font-black uppercase">
          <span className="italic font-light">SERVICIO </span>A BORDO
        </h2>

        {/* Iconos */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8">
          {SERVICIOS.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Image
                src={s.icon}
                alt={s.label}
                width={44}
                height={44}
                style={{ width: 44, height: 44, filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-[10px] font-bold text-white uppercase text-center whitespace-pre-line leading-tight" style={{ maxWidth: 70, opacity: 0.9 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Interiores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-auto mt-10" style={{ maxWidth: 768 }}>
          {[1, 2, 3].map(n => (
            <Image
              key={n}
              src={`/images/INTERIORPLATINO${n}.png`}
              alt={`Interior ${n}`}
              width={280}
              height={180}
              style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 14 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
