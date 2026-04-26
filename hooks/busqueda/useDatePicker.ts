// hooks/busqueda/useDatePicker.ts
// Genera una ventana de 5 días centrada en una fecha inicial.
// Las flechas mueven la ventana hacia atrás/adelante.

import { useState, useMemo } from 'react';

const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
const MESES_CORTO = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

export interface DiaItem {
  day: string;   // 'LUN'
  num: number;   // 15
  month: string; // 'Jul'
  iso: string;   // '2026-07-15'  ← para construir la URL fácilmente
}

/** Parsea dd/MM/yyyy o yyyy-MM-dd → Date */
function parseFecha(fecha: string): Date {
  if (!fecha) return new Date();
  if (fecha.includes('/')) {
    const [d, m, y] = fecha.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  const [y, m, d] = fecha.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

/** Date → dd/MM/yyyy */
export function dateToSlash(d: Date): string {
  const dd  = String(d.getDate()).padStart(2, '0');
  const mm  = String(d.getMonth() + 1).padStart(2, '0');
  const yy  = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

function buildWindow(centerDate: Date, size = 5): DiaItem[] {
  return Array.from({ length: size }, (_, i) => {
    const d = new Date(centerDate);
    d.setDate(centerDate.getDate() + i);
    return {
      day:   DIAS_SEMANA[d.getDay()],
      num:   d.getDate(),
      month: MESES_CORTO[d.getMonth()],
      iso:   `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,
    };
  });
}

export function useDatePicker(salidaParam: string) {
  // La fecha inicial viene del param (dd/MM/yyyy o vacío → hoy)
  const initialDate = useMemo(() => {
    const d = salidaParam ? parseFecha(salidaParam) : new Date();
    // Resetear hora para evitar bugs de DST
    d.setHours(0, 0, 0, 0);
    return d;
  }, [salidaParam]);

  // `windowStart` es el primer día visible en la ventana de 5
  const [windowStart, setWindowStart] = useState<Date>(() => {
    const d = new Date(initialDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Índice activo dentro de la ventana (0-4)
  const [activeIndex, setActiveIndex] = useState(0);

  const dias = useMemo(() => buildWindow(windowStart), [windowStart]);

  // Fecha actualmente seleccionada como dd/MM/yyyy
  const fechaActiva = dateToSlash(
    (() => {
      const d = new Date(windowStart);
      d.setDate(windowStart.getDate() + activeIndex);
      return d;
    })()
  );

  function irAtras() {
    if (activeIndex > 0) {
      // Todavía hay días antes dentro de la ventana visible
      setActiveIndex(prev => prev - 1);
    } else {
      // Estamos en el primer día visible → desplazar la ventana 1 día atrás
      setWindowStart(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 1);
        return d;
      });
      setActiveIndex(0); // el nuevo primer día queda seleccionado
    }
  }

  function irAdelante() {
    if (activeIndex < 4) {
      // Todavía hay días después dentro de la ventana visible
      setActiveIndex(prev => prev + 1);
    } else {
      // Estamos en el último día visible → desplazar la ventana 1 día adelante
      setWindowStart(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 1);
        return d;
      });
      setActiveIndex(4); // el nuevo último día queda seleccionado
    }
  }

  // También exponemos la fecha activa como objeto Date para cálculos externos
  const fechaActivaDate = (() => {
    const d = new Date(windowStart);
    d.setDate(windowStart.getDate() + activeIndex);
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  return { dias, activeIndex, setActiveIndex, fechaActiva, fechaActivaDate, irAtras, irAdelante };
}