'use client';

import { useEffect } from 'react';

interface Props {
  open: boolean;
  onAceptar: () => void;
  onRechazar: () => void;
  yaAceptado?: boolean; // ← nueva
}

export default function TerminosModal({ open, onAceptar, onRechazar, yaAceptado = false }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.65)' }}
    >
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">

        {/* CABECERA */}
        <div className="px-4 sm:px-6 py-4" style={{ background: '#1a4fa0' }}>
          <div className="text-white font-semibold text-sm sm:text-base leading-tight">
            Términos y Condiciones
          </div>
          <div className="text-blue-200 text-xs mt-0.5">
            Transportes y Logística Azul S.A.C.
          </div>
        </div>

        {/* CONTENIDO SCROLLEABLE — scroll invisible */}
        <div
          className="px-4 sm:px-6 py-5 overflow-y-auto"
          style={{
            maxHeight: '60vh',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`.terminos-scroll::-webkit-scrollbar { display: none; }`}</style>

          <p className="text-xs text-gray-500 mb-4">Última actualización: Enero 2026</p>

          <Section title="1. Uso del servicio">
            Al adquirir un pasaje con Transportes Azul, el usuario acepta cumplir con las normas
            de convivencia y seguridad establecidas por la empresa. El pasaje es personal e
            intransferible.
          </Section>

          <Section title="2. Cancelaciones y devoluciones">
            Las cancelaciones realizadas con más de 24 horas de anticipación tendrán derecho a
            devolución del 80% del monto pagado. Cancelaciones con menos de 24 horas no son
            reembolsables.
          </Section>

          <Section title="3. Equipaje">
            Cada pasajero tiene derecho a llevar un equipaje de mano y un equipaje de bodega de
            hasta 20 kg. El exceso de equipaje tendrá un costo adicional según tarifa vigente.
          </Section>

          <Section title="4. Responsabilidad">
            Transportes Azul no se hace responsable por objetos de valor dejados en el equipaje
            de bodega. Se recomienda llevar documentos y objetos de valor en el equipaje de mano.
          </Section>

          <Section title="5. Puntualidad">
            El bus partirá en el horario indicado. Se recomienda presentarse en el terminal con
            al menos 30 minutos de anticipación. No habrá devolución por pérdida del viaje.
          </Section>

          <Section title="6. Datos personales">
            Los datos proporcionados serán utilizados únicamente para la emisión del boleto y
            comunicaciones relacionadas al viaje, conforme a la Ley N° 29733 de Protección de
            Datos Personales.
          </Section>
        </div>

        {/* PIE */}
        <div className="border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
        {yaAceptado ? (
            <>
            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mr-auto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
                </svg>
                Términos aceptados
            </div>
            <button
                onClick={onRechazar}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
                Cerrar
            </button>
            </>
        ) : (
            <>
            <button
                onClick={onRechazar}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
                No acepto
            </button>
            <button
                onClick={onAceptar}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: '#1a4fa0' }}
            >
                Acepto los términos
            </button>
            </>
        )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div
        className="text-white text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide mb-2"
        style={{ background: '#2a5cbf' }}
      >
        {title}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}