// app/components/StepsBar.tsx
import React from 'react';

export function StepsBar({ active }: { active: number }) {
  const steps = ['SELECCIÓN', 'ASIENTOS', 'PASAJERO', 'PAGO'];
  return (
    <div className="flex items-center w-full">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex items-center gap-3 justify-center flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0"
              style={
                i + 1 <= active
                  ? { backgroundColor: 'var(--brand)', color: '#fff', borderColor: 'var(--brand-mid)' }
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
          {i < steps.length - 1 && (
            <div
              className="h-0.5 flex-1 shrink-0"
              style={{ backgroundColor: i + 1 < active ? 'var(--brand)' : '#d1d5db', maxWidth: '80px' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}