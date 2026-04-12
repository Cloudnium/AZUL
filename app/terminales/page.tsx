// app/terminales/page.tsx
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

export default function TerminalesPage() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ minHeight: 445 }}>

        {/* Card izquierda */}
        <FadeIn direction="right" delay={0} style={{ display: 'flex' }}>
          <div
            className="text-white flex flex-col justify-center w-full"
            style={{
              background: 'linear-gradient(to right, #0e73b5 0%, #0a5a8a 100%)',
              padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem)',
            }}
          >
            <div className="flex items-center mb-4" style={{ gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
              <Image
                src="/images/STORE.png"
                alt="Terminal icon"
                width={95}
                height={95}
                style={{
                  filter: 'brightness(0) invert(1)',
                  flexShrink: 0,
                  width: 'clamp(52px, 10vw, 95px)',
                  height: 'clamp(52px, 10vw, 95px)',
                }}
              />
              <div>
                <p style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.4rem)', fontStyle: 'italic', fontWeight: 300, opacity: 0.9, lineHeight: 1, margin: 0 }}>
                  Terminal
                </p>
                <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 3.1rem)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
                  Trujillo
                </h1>
              </div>
            </div>

            <div
              style={{
                paddingLeft: 'clamp(60px, calc(clamp(52px, 10vw, 95px) + 0.75rem), 111px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                fontSize: 'clamp(1rem, 2.8vw, 2.1rem)',
                lineHeight: 1.4,
              }}
            >
              <div className="flex items-center" style={{ gap: '0.4rem' }}>
                <svg viewBox="0 0 24 24" fill="white"
                  style={{ flexShrink: 0, width: 'clamp(16px, 2.5vw, 28px)', height: 'clamp(16px, 2.5vw, 28px)', marginLeft: 'clamp(-22px, -2.8vw, -36px)' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span style={{ fontWeight: 400 }}>TERRAPUERTO TRUJILLO</span>
              </div>
              <span>953078321</span>
              <span>Lunes a Domingo</span>
              <span>De 8:00am a 11:00pm</span>
            </div>
          </div>
        </FadeIn>

        {/* Imagen */}
        <FadeIn direction="left" delay={0.15} className="relative" style={{ minHeight: 445 }}>
          <Image
            src="/images/TRUJILLO.png"
            alt="Trujillo"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              filter: 'brightness(1.15) contrast(1.1) saturate(1.4)',
            }}
          />
          <div className="absolute inset-x-0 flex items-start justify-center" style={{ top: '1.5rem' }}>
            <span
              className="text-white font-black"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                letterSpacing: '0.08em',
                textShadow: '2px 2px 0px rgba(0,0,0,0.15), 3px 4px 16px rgba(0,0,0,0.35)',
                lineHeight: 1,
              }}
            >
              TRUJILLO
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Mapa */}
      <FadeIn direction="up" delay={0}>
        <div style={{ height: 445, width: '100%' }}>
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
      </FadeIn>
    </div>
  );
}