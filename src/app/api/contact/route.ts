import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function POST(req: Request) {
  const {name, email, message, website} = await req.json() as
    {name?: string; email?: string; message?: string; website?: string} // 'website' = honeypot

  if (website) return NextResponse.json({ok: true}) // bot trap
  if (!name || !email || !message) return NextResponse.json({ok:false, error:'Missing fields'}, {status:400})

  await transporter.sendMail({
    from: `"Portfolio" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: message,
    html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g,'<br/>')}</p>`
  })

  return NextResponse.json({ok:true})
}
