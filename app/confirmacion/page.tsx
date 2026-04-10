// ===== CONFIRMACION page.tsx =====
'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const orden = searchParams.get('orden') || 'AZ-2026-0001';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-blue-700 mb-2">¡Reserva Confirmada!</h1>
        <p className="text-gray-500 text-sm mb-6">Tu pago fue procesado correctamente.</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Número de orden</p>
          <p className="text-2xl font-black text-blue-700">{orden}</p>
        </div>

        <div className="text-left space-y-2 text-sm text-gray-600 mb-8 bg-blue-50 rounded-xl p-4">
          <p>🚌 <strong>Ruta:</strong> Piura → Trujillo</p>
          <p>📅 <strong>Fecha:</strong> 13/02/2026 — 10:00 PM</p>
          <p>🪑 <strong>Asiento:</strong> #08 — Piso 1</p>
          <p>💰 <strong>Total pagado:</strong> S/ 35.00</p>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Se envió una confirmación a tu correo electrónico.
        </p>

        <Link href="/">
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}