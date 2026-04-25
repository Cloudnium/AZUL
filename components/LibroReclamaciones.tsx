'use client';

import { useState } from 'react';

export default function LibroReclamaciones() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<'reclamo' | 'queja'>('reclamo');
  const [enviado, setEnviado] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  function resetForm() {
    setTipo('reclamo');
    setEnviado(false);
  }

  function handleClose() {
    setOpen(false);
    resetForm();
  }

  function handleEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Aquí puedes conectar tu backend:
    // const data = new FormData(e.currentTarget);
    // await fetch('/api/reclamaciones', { method: 'POST', body: data });
    setEnviado(true);
  }

  return (
    <>
      {/* ── BOTÓN EN EL FOOTER ── */}
      <button
        onClick={() => setOpen(true)}
        className="hover:text-white transition-colors text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgb(191 219 254)' }}
      >
        Libro de reclamaciones
      </button>

      {/* ── OVERLAY ── */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 9999, overflowY: 'auto', padding: '24px 12px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: 12, width: '100%', maxWidth: 720,
            fontFamily: 'inherit', overflow: 'hidden', marginBottom: 24,
          }}>

            {/* CABECERA */}
            <div style={{ background: '#1a4fa0', padding: '18px 24px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect width="36" height="36" rx="5" fill="#1a4fa0"/>
                    <path d="M8 10h20M8 14h14M8 18h16M8 22h12M8 26h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="28" cy="23" r="6" fill="#e53935"/>
                    <path d="M25.5 23l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>
                    Libro de Reclamaciones — Sullana Express (Digital)
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 3 }}>
                    Registro oficial de disconformidades y quejas del consumidor
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button onClick={resetForm} title="Reiniciar" style={btnIcon}>↺</button>
                <button onClick={handleClose} title="Cerrar" style={btnIcon}>✕</button>
              </div>
            </div>

            {/* META */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr', borderBottom: '1px solid #e0e0e0', background: '#f7f7f7' }}>
              {[
                { label: 'Empresa', value: 'EMP. DE TRANSP. Y TURISMO SULLANA EXPRESS' },
                { label: 'RUC', value: '20427652956' },
                { label: 'Dirección', value: 'AV. INDUSTRIAL CON SANTA LUCIA NRO. 291 (EL BOSQUE) LIMA' },
                { label: 'Fecha Reclamo', value: today },
              ].map((m, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRight: i < 3 ? '1px solid #e0e0e0' : 'none' }}>
                  <div style={{ fontSize: 11, color: '#777', marginBottom: 3 }}>{m.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#222', lineHeight: 1.3 }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* FORMULARIO */}
            {enviado ? (
              <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1a4fa0', marginBottom: 8 }}>
                  Reclamo enviado con éxito
                </div>
                <div style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
                  Recibirá una respuesta en un plazo máximo de 30 días calendario.
                </div>
                <button onClick={handleClose} style={{ ...btnPrimary }}>Cerrar</button>
              </div>
            ) : (
              <form onSubmit={handleEnviar} style={{ padding: '18px 22px' }}>

                {/* SECCIÓN 1 */}
                <SectionTitle>1.— IDENTIFICACIÓN DEL CONSUMIDOR DEL RECLAMANTE</SectionTitle>
                <div style={{ ...grid3, marginBottom: 10 }}>
                  <Field label="Identidad">
                    <select name="identidad" style={select}>
                      <option>DNI</option>
                      <option>Carné de extranjería</option>
                      <option>Pasaporte</option>
                      <option>RUC</option>
                    </select>
                  </Field>
                  <Field label="Número de Documento"><input name="nroDoc" type="text" maxLength={15} style={input} /></Field>
                  <Field label="Nombres"><input name="nombres" type="text" style={input} required /></Field>
                </div>
                <div style={{ ...grid3, marginBottom: 10 }}>
                  <Field label="Apellido Paterno"><input name="apPaterno" type="text" style={input} required /></Field>
                  <Field label="Apellido Materno"><input name="apMaterno" type="text" style={input} /></Field>
                  <Field label="Teléfono"><input name="telefono" type="tel" style={input} required /></Field>
                </div>
                <div style={{ ...grid3, marginBottom: 18 }}>
                  <Field label="Email"><input name="email" type="email" style={input} required /></Field>
                  <Field label="Domicilio"><input name="domicilio" type="text" style={input} /></Field>
                  <Field label="Apoderado del menor">
                    <input name="apoderado" type="text" placeholder="Solo si es menor de edad" style={input} />
                  </Field>
                </div>

                {/* SECCIÓN 2 */}
                <SectionTitle>2.— IDENTIFICACIÓN DEL BIEN CONTRATADO</SectionTitle>
                <div style={{ ...grid3, marginBottom: 10 }}>
                  <Field label="Fecha Incidente"><input name="fechaIncidente" type="date" style={input} required /></Field>
                  <Field label="Servicio">
                    <select name="servicio" style={select}>
                      <option>Pasaje</option>
                      <option>Encomienda</option>
                      <option>Carga</option>
                      <option>Otro</option>
                    </select>
                  </Field>
                  <Field label="Motivo">
                    <select name="motivo" style={select}>
                      <option>Atención en agencia</option>
                      <option>Retraso en salida</option>
                      <option>Equipaje dañado/perdido</option>
                      <option>Cobro indebido</option>
                      <option>Otro</option>
                    </select>
                  </Field>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.7fr 0.7fr', gap: 10, marginBottom: 18 }}>
                  <Field label="Empresa">
                    <input type="text" value="EMPRESA DE TRANSPORTES Y TURISMO SULLANA EXPRESS" readOnly
                      style={{ ...input, background: '#f5f5f5', color: '#666', fontSize: 11 }} />
                  </Field>
                  <Field label="Documento">
                    <select name="tipoDoc" style={select}>
                      <option>Factura</option><option>Boleta</option><option>Ticket</option><option>Sin documento</option>
                    </select>
                  </Field>
                  <Field label="Serie"><input name="serie" type="text" placeholder="000" style={input} /></Field>
                  <Field label="Número"><input name="numero" type="text" placeholder="000000" style={input} /></Field>
                </div>

                {/* SECCIÓN 3 */}
                <SectionTitle>3.— DETALLE DE RECLAMACIÓN</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  {(['reclamo', 'queja'] as const).map((t) => (
                    <div key={t} onClick={() => setTipo(t)} style={{
                      border: tipo === t ? '1.5px solid #2a5cbf' : '1px solid #ccc',
                      background: tipo === t ? '#eef3fb' : 'transparent',
                      borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{
                          width: 15, height: 15, borderRadius: '50%',
                          border: `1.5px solid ${tipo === t ? '#2a5cbf' : '#ccc'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {tipo === t && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2a5cbf' }} />}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#222', textTransform: 'capitalize' }}>{t}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#555', lineHeight: 1.4 }}>
                        {t === 'reclamo'
                          ? 'Disconformidad relacionada a los productos o servicios'
                          : 'Disconformidad no relacionada a los productos o servicios, o malestar respecto a la atención al cliente'}
                      </div>
                    </div>
                  ))}
                </div>
                <input type="hidden" name="tipoReclamo" value={tipo} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 6 }}>
                  <Field label="Detalle">
                    <textarea name="detalle" required placeholder="Descripción breve de la ocurrencia"
                      style={{ ...input, minHeight: 80, resize: 'vertical' }} />
                  </Field>
                  <Field label="Pedido">
                    <textarea name="pedido" placeholder="¿Qué espera obtener del reclamo o queja?"
                      style={{ ...input, minHeight: 80, resize: 'vertical' }} />
                  </Field>
                </div>

                {/* PIE */}
                <div style={{ borderTop: '1px solid #e0e0e0', marginTop: 16, paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <p style={{ fontSize: 11, color: '#777', lineHeight: 1.5, maxWidth: 360, margin: 0 }}>
                    La empresa dará respuesta en un plazo no mayor de 30 días calendario.
                    Válido conforme al D.S. 011-2011-PCM.
                  </p>
                  <button type="submit" style={btnPrimary}>ENVIAR FORMULARIO</button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── Helpers de estilo ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#2a5cbf', color: 'white', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 6, marginBottom: 12, letterSpacing: '.3px' }}>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 11, color: '#666' }}>{label}</label>
      {children}
    </div>
  );
}

const input: React.CSSProperties = { width: '100%', padding: '7px 10px', border: '1px solid #ccc', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' };
const select: React.CSSProperties = { ...input, cursor: 'pointer' };
const grid3: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 };
const btnIcon: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.8, fontSize: 20, padding: '4px 6px' };
const btnPrimary: React.CSSProperties = { background: '#1a4fa0', color: 'white', border: 'none', padding: '10px 26px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' };
