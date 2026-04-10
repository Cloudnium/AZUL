// app/busqueda/page.tsx
import { Suspense } from 'react';
import BusquedaPage from './BusquedaPage'; // ← mueve el componente actual a este archivo

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Cargando...</div>}>
      <BusquedaPage />
    </Suspense>
  );
}