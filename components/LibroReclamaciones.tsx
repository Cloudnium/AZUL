'use client';

import { useState } from 'react';

export default function LibroReclamaciones() {
  const [open, setOpen]       = useState(false);
  const [tipo, setTipo]       = useState<'reclamo' | 'queja'>('reclamo');
  const [enviado, setEnviado] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  function resetForm() { setTipo('reclamo'); setEnviado(false); }
  function handleClose() { setOpen(false); resetForm(); }
  const [codigo, setCodigo] = useState(''); // ← agrega esta línea junto a los otros useState del inicio

  async function handleEnviar(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const raw  = new FormData(form);
  const data = Object.fromEntries(raw.entries());

  try {
    const res  = await fetch('/api/reclamaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.ok) {
      setEnviado(true);
      setCodigo(json.codigo);
    } else {
      alert('Hubo un error al enviar. Intente nuevamente.');
    }
  } catch {
    alert('Error de conexión. Intente nuevamente.');
  }
}

  return (
    <>
      {/* ── TRIGGER EN FOOTER ── */}
      <button
        onClick={() => setOpen(true)}
        className="text-blue-200 hover:text-white transition-colors text-left text-base bg-transparent border-none cursor-pointer p-0"
      >
        Libro de reclamaciones
      </button>

      {/* ── OVERLAY ── */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          className="fixed inset-0 z-[9999] overflow-y-auto flex items-start justify-center p-3 sm:p-6"
          style={{ background: 'rgba(0,0,0,0.65)' }}
        >
          <div className="bg-white rounded-xl w-full max-w-2xl my-3 overflow-hidden shadow-2xl">

            {/* CABECERA */}
            <div className="flex items-start justify-between gap-3 px-4 sm:px-6 py-4" style={{ background: '#1a4fa0' }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                    <rect width="36" height="36" rx="5" fill="#1a4fa0"/>
                    <path d="M8 10h20M8 14h14M8 18h16M8 22h12M8 26h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="28" cy="23" r="6" fill="#e53935"/>
                    <path d="M25.5 23l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm sm:text-base leading-tight">
                    Libro de Reclamaciones — Transportes Azul (Digital)
                  </div>
                  <div className="text-blue-200 text-xs mt-0.5 hidden sm:block">
                    Registro oficial de disconformidades y quejas del consumidor
                  </div>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={resetForm} title="Reiniciar"
                  className="text-white opacity-70 hover:opacity-100 text-xl px-2 py-1 bg-transparent border-none cursor-pointer leading-none">↺</button>
                <button onClick={handleClose} title="Cerrar"
                  className="text-white opacity-70 hover:opacity-100 text-xl px-2 py-1 bg-transparent border-none cursor-pointer leading-none">✕</button>
              </div>
            </div>

            {/* BARRA META */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-200 bg-gray-50">
              {[
                { label: 'Empresa',       value: 'TRANSPORTES Y LOGISTICA AZUL S.A.C.' },
                { label: 'RUC',           value: '20615003663' },
                { label: 'Dirección',     value: 'AV. INDUSTRIAL NRO. 291 URB. INDUSTRIAL LA AURORA LIMA - LIMA - ATE' },
                { label: 'Fecha Reclamo', value: today },
              ].map((m, i) => (
                <div key={i} className={`px-3 py-2 ${i % 2 === 0 ? 'border-r border-gray-200' : ''} sm:border-r sm:last:border-r-0`}>
                  <div className="text-[10px] text-gray-400 mb-0.5">{m.label}</div>
                  <div className="text-[11px] font-semibold text-gray-700 leading-tight break-words">{m.value}</div>
                </div>
              ))}
            </div>

            {/* CONTENIDO */}
            {enviado ? (
              <div className="px-6 py-16 text-center">
                <div className="text-5xl mb-4">✅</div>
                <div className="text-lg font-semibold mb-2" style={{ color: '#1a4fa0' }}>
                  Reclamo enviado con éxito
                </div>
                <div className="text-sm font-semibold text-gray-600 mb-6">
                  Código de seguimiento: <span style={{ color: '#1a4fa0' }}>{codigo}</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Recibirá una respuesta en un plazo máximo de 30 días calendario.
                </div>
                <button onClick={handleClose}
                  className="text-white font-semibold text-sm px-6 py-2.5 rounded-lg"
                  style={{ background: '#1a4fa0' }}>
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnviar} className="px-4 sm:px-6 py-4 space-y-5">

                {/* SECCIÓN 1 */}
                <Section title="1.— IDENTIFICACIÓN DEL CONSUMIDOR DEL RECLAMANTE">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <F label="Identidad">
                      <select name="identidad" className={sel}>
                        <option>DNI</option>
                        <option>Carné de extranjería</option>
                        <option>Pasaporte</option>
                        <option>RUC</option>
                      </select>
                    </F>
                    <F label="Número de Documento">
                      <input name="nroDoc" type="text" maxLength={15} className={inp} />
                    </F>
                    <F label="Nombres">
                      <input name="nombres" type="text" className={inp} required />
                    </F>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <F label="Apellido Paterno">
                      <input name="apPaterno" type="text" className={inp} required />
                    </F>
                    <F label="Apellido Materno">
                      <input name="apMaterno" type="text" className={inp} />
                    </F>
                    <F label="Teléfono">
                      <input name="telefono" type="tel" className={inp} required />
                    </F>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <F label="Email">
                      <input name="email" type="email" className={inp} required />
                    </F>
                    <F label="Domicilio">
                      <input name="domicilio" type="text" className={inp} />
                    </F>
                    <F label="Apoderado del menor">
                      <input name="apoderado" type="text" placeholder="Solo si es menor de edad" className={inp} />
                    </F>
                  </div>
                </Section>

                {/* SECCIÓN 2 */}
                <Section title="2.— IDENTIFICACIÓN DEL BIEN CONTRATADO">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <F label="Fecha Incidente">
                      <input name="fechaIncidente" type="date" className={inp} required />
                    </F>
                    <F label="Servicio">
                      <select name="servicio" className={sel}>
                        <option>Pasaje</option>
                        <option>Encomienda</option>
                        <option>Carga</option>
                        <option>Otro</option>
                      </select>
                    </F>
                    <F label="Motivo">
                      <select name="motivo" className={sel}>
                        <option>Atención en agencia</option>
                        <option>Retraso en salida</option>
                        <option>Equipaje dañado/perdido</option>
                        <option>Cobro indebido</option>
                        <option>Otro</option>
                      </select>
                    </F>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <F label="Empresa">
                        <input type="text" value="TRANSPORTES Y LOGISTICA AZUL S.A.C." readOnly
                          className={`${inp} bg-gray-100 text-gray-400 text-xs`} />
                      </F>
                    </div>
                    <F label="Documento">
                      <select name="tipoDoc" className={sel}>
                        <option>Factura</option>
                        <option>Boleta</option>
                        <option>Ticket</option>
                        <option>Sin documento</option>
                      </select>
                    </F>
                    <F label="Serie">
                      <input name="serie" type="text" placeholder="000" className={inp} />
                    </F>
                    <F label="Número">
                      <input name="numero" type="text" placeholder="000000" className={inp} />
                    </F>
                  </div>
                </Section>

                {/* SECCIÓN 3 */}
                <Section title="3.— DETALLE DE RECLAMACIÓN">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['reclamo', 'queja'] as const).map((t) => (
                      <button
                        key={t} type="button" onClick={() => setTipo(t)}
                        className="text-left rounded-lg p-3 transition-all cursor-pointer w-full bg-transparent"
                        style={{
                          border: tipo === t ? '1.5px solid #2a5cbf' : '1px solid #d1d5db',
                          background: tipo === t ? '#eef3fb' : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ border: `1.5px solid ${tipo === t ? '#2a5cbf' : '#9ca3af'}` }}>
                            {tipo === t && <div className="w-2 h-2 rounded-full" style={{ background: '#2a5cbf' }} />}
                          </div>
                          <span className="text-sm font-semibold text-gray-800 capitalize">{t}</span>
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {t === 'reclamo'
                            ? 'Disconformidad relacionada a los productos o servicios'
                            : 'Disconformidad no relacionada a los productos/servicios, o malestar en la atención al cliente'}
                        </div>
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="tipoReclamo" value={tipo} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <F label="Detalle">
                      <textarea name="detalle" required
                        placeholder="Descripción breve de la ocurrencia"
                        className={`${inp} min-h-[90px] resize-y`} />
                    </F>
                    <F label="Pedido">
                      <textarea name="pedido"
                        placeholder="¿Qué espera obtener del reclamo o queja?"
                        className={`${inp} min-h-[90px] resize-y`} />
                    </F>
                  </div>
                </Section>

                {/* PIE */}
                <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs text-gray-400 leading-relaxed m-0">
                    La empresa dará respuesta en un plazo no mayor de 30 días calendario.
                    Válido conforme al D.S. 011-2011-PCM.
                  </p>
                  <button type="submit"
                    className="w-full sm:w-auto text-white font-semibold text-sm px-6 py-2.5 rounded-lg whitespace-nowrap hover:opacity-90 transition-opacity"
                    style={{ background: '#1a4fa0' }}>
                    ENVIAR FORMULARIO
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}

/* ── Sub-componentes ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-white text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide"
        style={{ background: '#2a5cbf' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">{label}</label>
      {children}
    </div>
  );
}

const inp = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-700 focus:outline-none focus:border-blue-500 box-border font-[inherit]';
const sel = `${inp} cursor-pointer`;
