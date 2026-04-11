import Image from 'next/image';

export default function TerminalesPage() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ minHeight: 440 }}>
        {/* Info — centrado vertical y horizontal */}
        <div
          className="text-white flex flex-col items-center justify-center text-center"
          style={{
            background: 'linear-gradient(to right, #0e73b5 0%, #0a5a8a 100%)',
            padding: '3rem 3rem',
          }}
        >
          {/* Icono + título */}
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/images/STORE.png"
              alt="Terminal icon"
              width={72}
              height={72}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="text-left">
              <p style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 300, opacity: 0.9, lineHeight: 1.2 }}>Terminal</p>
              <h1 style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>Trujillo</h1>
            </div>
          </div>

          {/* Datos centrados */}
          <div className="flex flex-col items-center" style={{ gap: '1.1rem', fontSize: '1.2rem' }}>
            <div className="flex items-center gap-3">
              <svg width="18" height="22" viewBox="0 0 13 16" fill="none">
                <path d="M6.5 0C4.01 0 2 2.01 2 4.5c0 3.38 4.5 9.9 4.5 9.9s4.5-6.52 4.5-9.9C11 2.01 8.99 0 6.5 0zm0 6.125A1.625 1.625 0 1 1 6.5 2.875a1.625 1.625 0 0 1 0 3.25z" fill="white"/>
              </svg>
              <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>TERRAPUERTO TRUJILLO</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="19" height="19" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 1.5h2.8l1.1 2.7-1.7 1.7c.8 1.6 2 2.8 3.6 3.6l1.7-1.7 2.7 1.1v2.8C12.7 12.8 12 13 11.3 13 6 13 1 8 1 2.7 1 2 1.2 1.3 2.5 1.5z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              <span>953078321</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="19" height="19" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="white" strokeWidth="1.3"/>
                <path d="M1.5 5.5h11" stroke="white" strokeWidth="1.3"/>
                <path d="M4.5 1v3M9.5 1v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>Lunes a Domingo</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="19" height="19" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.3"/>
                <path d="M7 4.5V7.5l2 2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>De 8:00am a 11:00pm</span>
            </div>
          </div>
        </div>

        {/* Imagen ciudad — completa, sin overlay, sin recorte */}
        <div className="relative" style={{ minHeight: 440 }}>
          <Image
            src="/images/TRUJILLO.png"
            alt="Trujillo"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          <div className="absolute inset-x-0 flex items-start justify-center" style={{ top: '2rem' }}>
            <span
              className="text-white font-black"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                letterSpacing: '0.18em',
                textShadow: '2px 3px 14px rgba(0,0,0,0.5)',
                lineHeight: 1,
              }}
            >
              TRUJILLO
            </span>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div style={{ height: 440, width: '100%' }}>
        <iframe
          src="https://www.google.com/maps?q=Terrapuerto+Trujillo,+Trujillo,+Peru&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Terrapuerto Trujillo"
        />
      </div>
    </div>
  );
}