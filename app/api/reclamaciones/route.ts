import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      identidad, nroDoc, nombres, apPaterno, apMaterno,
      telefono, email, domicilio, apoderado,
      fechaIncidente, servicio, motivo, tipoDoc, serie, numero,
      tipoReclamo, detalle, pedido,
    } = data;

    const fechaReclamo = new Date().toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });

    const codigo = `REC-${Date.now()}`;

    const html = `
      <div style="font-family:sans-serif;max-width:620px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
        
        <!-- Cabecera -->
        <div style="background:#1a4fa0;padding:20px 24px;">
          <h2 style="color:white;margin:0;font-size:18px;">📋 Nuevo ${tipoReclamo === 'queja' ? 'Queja' : 'Reclamo'} recibido</h2>
          <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px;">
            TRANSPORTES Y LOGISTICA AZUL S.A.C. — Libro de Reclamaciones Digital
          </p>
        </div>

        <!-- Código y fecha -->
        <div style="background:#f0f5ff;padding:12px 24px;border-bottom:1px solid #dce8ff;display:flex;justify-content:space-between;">
          <span style="font-size:13px;color:#1a4fa0;font-weight:700;">Código: ${codigo}</span>
          <span style="font-size:13px;color:#555;">Fecha: ${fechaReclamo}</span>
        </div>

        <div style="padding:20px 24px;">

          <!-- Sección 1 -->
          <h3 style="font-size:13px;font-weight:700;color:white;background:#2a5cbf;padding:6px 12px;border-radius:5px;margin:0 0 12px;">
            1. DATOS DEL RECLAMANTE
          </h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="${td}">Identidad</td><td style="${tdv}">${identidad} — ${nroDoc}</td>
              <td style="${td}">Nombre completo</td><td style="${tdv}">${nombres} ${apPaterno} ${apMaterno}</td>
            </tr>
            <tr>
              <td style="${td}">Teléfono</td><td style="${tdv}">${telefono}</td>
              <td style="${td}">Email</td><td style="${tdv}">${email}</td>
            </tr>
            <tr>
              <td style="${td}">Domicilio</td><td style="${tdv}" colspan="3">${domicilio || '—'}</td>
            </tr>
            ${apoderado ? `<tr><td style="${td}">Apoderado</td><td style="${tdv}" colspan="3">${apoderado}</td></tr>` : ''}
          </table>

          <!-- Sección 2 -->
          <h3 style="font-size:13px;font-weight:700;color:white;background:#2a5cbf;padding:6px 12px;border-radius:5px;margin:0 0 12px;">
            2. BIEN CONTRATADO
          </h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="${td}">Fecha incidente</td><td style="${tdv}">${fechaIncidente}</td>
              <td style="${td}">Servicio</td><td style="${tdv}">${servicio}</td>
            </tr>
            <tr>
              <td style="${td}">Motivo</td><td style="${tdv}">${motivo}</td>
              <td style="${td}">Documento</td><td style="${tdv}">${tipoDoc} ${serie}-${numero}</td>
            </tr>
          </table>

          <!-- Sección 3 -->
          <h3 style="font-size:13px;font-weight:700;color:white;background:#2a5cbf;padding:6px 12px;border-radius:5px;margin:0 0 12px;">
            3. DETALLE DEL ${tipoReclamo?.toUpperCase()}
          </h3>
          <div style="background:#f9f9f9;border:1px solid #e0e0e0;border-radius:6px;padding:14px;margin-bottom:12px;">
            <div style="font-size:11px;color:#888;margin-bottom:4px;">DETALLE DE LA OCURRENCIA</div>
            <div style="font-size:14px;color:#222;line-height:1.6;">${detalle}</div>
          </div>
          <div style="background:#f0f5ff;border:1px solid #dce8ff;border-radius:6px;padding:14px;margin-bottom:20px;">
            <div style="font-size:11px;color:#888;margin-bottom:4px;">PEDIDO DEL CONSUMIDOR</div>
            <div style="font-size:14px;color:#222;line-height:1.6;">${pedido || '—'}</div>
          </div>

        </div>

        <!-- Pie -->
        <div style="background:#f7f7f7;border-top:1px solid #e0e0e0;padding:14px 24px;text-align:center;">
          <p style="font-size:11px;color:#888;margin:0;">
            Debe dar respuesta en un plazo máximo de <strong>30 días calendario</strong>.
            D.S. 011-2011-PCM — Libro de Reclamaciones Digital
          </p>
        </div>

      </div>
    `;

    await resend.emails.send({
      from: 'Libro de Reclamaciones <onboarding@resend.dev>', // Cambia por tu dominio verificado
      to: process.env.EMAIL_DESTINO!,
      replyTo: email,
      subject: `[${tipoReclamo?.toUpperCase()}] ${nombres} ${apPaterno} — ${servicio} | ${codigo}`,
      html,
    });

    return NextResponse.json({ ok: true, codigo });

  } catch (error) {
    console.error('Error enviando reclamo:', error);
    return NextResponse.json({ ok: false, error: 'Error al enviar' }, { status: 500 });
  }
}

// Estilos de celdas para la tabla HTML del email
const td = 'font-size:12px;color:#888;padding:6px 8px;border:1px solid #eee;background:#fafafa;width:20%;white-space:nowrap;';
const tdv = 'font-size:13px;color:#222;padding:6px 8px;border:1px solid #eee;';
