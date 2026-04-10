// components/navbar.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Menu } from 'lucide-react';

const links = [
  { href: '/',           label: 'INICIO' },
  { href: '/cargo',      label: 'CARGO' },
  { href: '/#destinos',  label: 'DESTINOS' },
  { href: '/servicios',  label: 'SERVICIOS', hasDropdown: true, dropdown: [
    { href: '/servicios/platino',   label: 'Platino' },
    { href: '/servicios/economico', label: 'Economico' },
  ]},
  { href: '/terminales', label: 'TERMINALES' },
  { href: '/contacto',   label: 'CONTACTO' },
  { href: '/nosotros',   label: 'NOSOTROS' },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const [mobileServ, setMobileServ] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0560c5]">
      <div className="flex items-center px-6 md:px-10 py-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/LOGO.png" alt="Azul" width={150} height={52} className="h-12 w-auto" priority />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-7 ml-auto">
          {links.map(l => (
            <li key={l.href} className="shrink-0 relative" ref={l.hasDropdown ? dropRef : undefined}>
              {l.hasDropdown ? (
                <>
                  <button
                    onClick={() => setDropOpen(p => !p)}
                    className="flex items-center gap-0.5 text-white text-sm font-bold tracking-widest cursor-pointer hover:opacity-75 transition-opacity select-none bg-transparent border-0"
                  >
                    {l.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropOpen && (
                    <div className="absolute top-full left-0 mt-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                      {l.dropdown?.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDropOpen(false)}
                          className="block px-5 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-[#0560c5] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={l.href} className="text-white text-sm font-bold tracking-widest hover:opacity-75 transition-opacity whitespace-nowrap">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger mobile */}
        <button className="md:hidden ml-auto text-white p-1" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden w-full px-6 pb-4 bg-[#0450a8]">
          {links.map(l => (
            <div key={l.href}>
              {l.hasDropdown ? (
                <>
                  <button
                    onClick={() => setMobileServ(p => !p)}
                    className="w-full flex items-center justify-between text-white text-sm font-bold tracking-widest py-3 bg-transparent"
                  >
                    {l.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      style={{ transition: 'transform 0.2s', transform: mobileServ ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {mobileServ && (
                    <div className="bg-[#03408f] rounded-xl mb-1 flex flex-col gap-y-1 p-1">
                      {l.dropdown?.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => { setOpen(false); setMobileServ(false); }}
                          className="block px-6 py-2.5 text-sm font-semibold text-white/90 hover:text-white transition-colors rounded-lg hover:bg-[#0450a8]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between text-white text-sm font-bold tracking-widest py-3 border-b border-blue-500 last:border-0"
                >
                  {l.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}