// components/footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#0560c5' }}>
      <div className="w-full px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <Image
            src="/images/CIERRE/Recurso 607.png"
            alt="Azul"
            width={200}
            height={70}
            style={{ width: 'auto', height: 70, filter: 'brightness(0) invert(1)' }}
          />
          <p className="mt-4 text-base text-blue-100 leading-relaxed max-w-xs">
            Conectando el norte del Perú con seguridad, confort y la mejor tecnología. Viaja con nosotros.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h4 className="font-bold text-xl mb-4">Enlaces</h4>
          <ul className="space-y-3 text-base text-blue-100">
            {[
              { href: '/',           label: 'Inicio' },
              { href: '/cargo',      label: 'Cargo' },
              { href: '/#destinos',   label: 'Destinos' },
              { href: '/terminales', label: 'Terminales' },
              { href: '/contacto',   label: 'Contacto' },
              { href: '/nosotros',   label: 'Nosotros' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h4 className="font-bold text-xl mb-4">Ayuda</h4>
          <ul className="space-y-3 text-base text-blue-100">
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/reclamos" className="hover:text-white transition-colors">
                Libro de reclamaciones
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-bold text-xl mb-4">Contacto</h4>
          <p className="text-base text-blue-100 leading-relaxed">
            Agencias<br />
            Av. bolognesi 817 Piura.
          </p>
        </div>
      </div>

      {/* Bottom bar — sin línea separadora */}
      <div>
        <div className="w-full px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-blue-200">
            © 2026 CLOUDNIUM TODOS LOS DERECHOS RESERVADOS
          </p>

          {/* Iconos sociales */}
          <div className="flex gap-4">
            {[
              { src: '/images/CIERRE/Recurso 609.png',     alt: 'LinkedIn',  href: '#' },
              { src: '/images/CIERRE/Recurso 608.png',      alt: 'X',         href: '#' },
              { src: '/images/CIERRE/Recurso 611.png',  alt: 'Instagram', href: '#' },
              { src: '/images/CIERRE/Recurso 610.png', alt: 'TikTok',    href: '#' },
            ].map(s => (
              <Link key={s.alt} href={s.href} aria-label={s.alt}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={32}
                  height={32}
                  style={{ width: 32, height: 32, filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                />
              </Link>
            ))}
          </div>

          {/* Métodos de pago */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/CIERRE/Recurso 612.png"
              alt="Visa / Master"
              width={40}
              height={28}
              style={{ width: 'auto', height: 32, filter: 'brightness(0) invert(1)', opacity: 0.85 }}
            />
            <span className="text-sm text-blue-100 font-semibold">VISA / MASTER</span>
          </div>

        </div>
      </div>
    </footer>
  );
}