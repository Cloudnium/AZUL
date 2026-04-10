import Image from 'next/image';

export default function TerminalesPage() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ minHeight: 288 }}>
        {/* Info */}
        <div
          className="p-8 sm:p-12 text-white flex flex-col justify-center"
          style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #1d4ed8)' }}
        >
          <p className="text-2xl mb-1">🏪</p>
          <h2 className="text-lg italic font-light">Terminal</h2>
          <h1 className="text-3xl font-black mb-6">Trujillo</h1>
          <div className="space-y-2 text-sm" style={{ opacity: 0.9 }}>
            <p>📍 TERRAPUERTO TRUJILLO</p>
            <p>📞 953078321</p>
            <p>📅 Lunes a Domingo</p>
            <p>🕐 De 8:00am a 11:00pm</p>
          </div>
        </div>

        {/* Imagen ciudad */}
        <div className="relative" style={{ minHeight: 256 }}>
          <Image
            src="/images/TRUJILLO.png"
            alt="Trujillo"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 flex items-end justify-center pb-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <span className="text-white text-4xl font-black tracking-widest">TRUJILLO</span>
          </div>
        </div>
      </div>

      {/* Mapa placeholder */}
      <div className="bg-gray-100 flex items-center justify-center" style={{ height: 288 }}>
        <div className="text-center text-gray-400">
          <div className="text-5xl mb-2">🗺</div>
          <p className="font-semibold">Mapa de ubicación</p>
          <p className="text-sm">Terrapuerto Trujillo</p>
        </div>
      </div>
    </div>
  );
}
