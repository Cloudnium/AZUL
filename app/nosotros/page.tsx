export default function NosotrosPage() {
  const cards = [
    { emoji: '🚌', title: 'Nuestra Misión', text: 'Brindar un servicio de transporte terrestre de calidad, conectando las principales ciudades del norte del Perú con puntualidad, seguridad y confort para cada uno de nuestros pasajeros.' },
    { emoji: '🌟', title: 'Nuestra Visión', text: 'Ser la empresa de transporte líder del norte del Perú, reconocida por su flota moderna, tecnología de vanguardia y el compromiso con la satisfacción de nuestros clientes.' },
    { emoji: '💎', title: 'Nuestros Valores', text: 'Seguridad, puntualidad, confort y honestidad son los pilares que guían cada viaje que realizamos. Tu confianza es nuestra mayor responsabilidad.' },
    { emoji: '🏆', title: 'Por qué elegirnos', text: 'Flota moderna 2026, asientos cama 160°, aire acondicionado, películas a bordo, monitoreo GPS permanente y un equipo dedicado a garantizar tu viaje perfecto.' },
  ];

  return (
    <div>
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #1d4ed8)' }}
      >
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wide">NOSOTROS</h1>
        <p className="mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ opacity: 0.85 }}>
          Conectando el norte del Perú con seguridad, confort y la mejor tecnología, comprometidos con tu bienestar y puntualidad.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map(c => (
          <div key={c.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">{c.emoji}</div>
            <h3 className="text-lg font-black text-blue-700 mb-2">{c.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
