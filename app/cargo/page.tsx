'use client';
import Image from 'next/image';
import { useState } from 'react';

const SERVICIOS = [
  { icon: '/images/ICON-CARGADOR.png',   label: 'CARGADOR\nDE CELULAR' },
  { icon: '/images/ICON-PELICULAS.png',  label: 'PELÍCULAS\nA BORDO' },
  { icon: '/images/ICON-AIRE.png',       label: 'AIRE\nACONDICIONADO' },
  { icon: '/images/ICON-BUSCAMA.png',    label: 'BUS CAMA\n160°' },
  { icon: '/images/ICON-SEMICAMA.png',   label: 'SEMI CAMA\n145°' },
  { icon: '/images/ICON-GPS.png',        label: 'MONITOREO\nGPS' },
  { icon: '/images/ICON-BANIO.png',      label: 'BAÑO\nQUÍMICO' },
];

export default function CargoPage() {
  const [orden, setOrden] = useState('');
  const [codigo, setCodigo] = useState('');

  return (
    <div>
      {/* Hero */}
      <div className="bg-blue-700 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-10 gap-6">
        <Image
          src="/images/CAMION.png"
          alt="Cargo"
          width={340}
          height={180}
          style={{ objectFit: 'contain', maxWidth: 340 }}
        />
        <div className="text-white text-left sm:text-right">
          <h1 className="text-6xl font-black uppercase">CARGO</h1>
          <p className="text-xl font-semibold">Descubre el Perú</p>
          <p className="text-lg italic font-bold">Viaja con clase</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="N° de Orden"
          value={orden}
          onChange={e => setOrden(e.target.value)}
          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600 w-full"
        />
        <input
          type="text"
          placeholder="Código de Orden"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600 w-full"
        />
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
          Buscar ▶
        </button>
      </div>

      {/* Nuestros buses */}
      <div className="max-w-5xl mx-auto px-4 pb-16 text-center">
        <h2 className="text-5xl font-black mb-8">
          <span className="italic font-light">NUESTROS </span>BUCES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Image src="/images/BUS1.png" alt="Bus Azul" width={440} height={180} style={{ width: '100%', height: 180, objectFit: 'contain' }} />
          <Image src="/images/BUSPLATINO.png" alt="Bus Platino" width={440} height={180} style={{ width: '100%', height: 180, objectFit: 'contain' }} />
        </div>

        {/* Servicios a bordo */}
        <div>
          <h4 className="text-sm font-bold text-left mb-4">Servicios a Bordo</h4>
          <div className="flex flex-wrap gap-6 justify-start">
            {SERVICIOS.map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <Image src={s.icon} alt={s.label} width={44} height={44} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                <span className="text-[9px] font-bold text-gray-500 uppercase text-center whitespace-pre-line leading-tight" style={{ maxWidth: 60 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
