import { NextResponse } from 'next/server';
import sendEmail from '../../../../lib/server/sendEmail';

export async function POST(req) {
  const { societe, ice, ville, numeroFix, numeroTelephone, email, besoin } = await req.json();

  if (!societe || !ice || !ville || !numeroFix || !numeroTelephone || !email || !besoin) {
    return NextResponse.json({ error: 'Tout les champs sont requis.' }, { status: 400 });
  }

  try {
    const emailResult = await sendEmail({
      to: email,
      subject: 'Demande de contact',
      text: `Societe: ${societe}\nICE: ${ice}\nVille: ${ville}\nNuméro fixe: ${numeroFix}\nNuméro de telephone: ${numeroTelephone}\nBesoin: ${besoin}`,
    });

    if (emailResult.success) {
      return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
    } else {
      console.error('Erreur lors de l\'envoi de l\'email:', emailResult.error);
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
  }
}