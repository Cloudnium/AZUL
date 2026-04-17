// components/StepsBar.tsx
import React from 'react';

const BRAND = '#185adb';
const BRAND_MID = '#a8c1f5';

export function StepsBar({ active }: { active: number }) {
  const steps = ['SELECCIÓN', 'ASIENTOS', 'PASAJERO', 'PAGO'];
  return (
    <div className="flex items-center w-full">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          {/* Círculo + texto */}
          <div className="flex items-center gap-3 justify-center flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0"
              style={
                i + 1 < active
                  // completado: solo borde azul, sin fondo
                  ? { backgroundColor: '#fff', color: BRAND, borderColor: BRAND }
                  : i + 1 === active
                  // activo: fondo azul
                  ? { backgroundColor: BRAND, color: '#fff', borderColor: BRAND_MID }
                  // pendiente: gris
                  : { backgroundColor: '#fff', borderColor: '#d1d5db', color: '#9ca3af' }
              }
            >
              {i + 1 < active ? '✓' : i + 1}
            </div>
            <span
              className="text-sm font-bold uppercase tracking-wider hidden sm:block shrink-0"
              style={{ color: i + 1 <= active ? '#111827' : '#9ca3af' }}
            >
              {s}
            </span>
          </div>

          {/* Línea entre pasos */}
          {i < steps.length - 1 && (
            <div className="flex items-center shrink-0" style={{ maxWidth: '80px', flex: 1 }}>
              {/* Línea gris siempre */}
              <div className="flex-1 h-0.5" style={{ backgroundColor: '#d1d5db' }} />
              {/* Solo el > al final de la línea completada */}
              {i + 1 === active - 1 && (
                <svg
                  width="10" height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M2 2l6 4-6 4"
                    stroke="#d1d5db"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}