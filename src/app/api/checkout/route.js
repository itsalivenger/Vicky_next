import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import sendEmail from '../../../../lib/server/sendEmail';

export async function POST(req) {
  const { formData, cart, user } = await req.json();

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const ordersCollection = db.collection('Orders');
    const couponsCollection = db.collection('Coupons');

    if (formData.promoCode) {
      const coupon = await couponsCollection.findOne({ code: formData.promoCode });

      if (!coupon) {
        client.close();
        return NextResponse.json({ error: 'Code promo invalide.' }, { status: 400 });
      }

      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        client.close();
        return NextResponse.json({ error: 'Le code promo a expiré.' }, { status: 400 });
      }
    }

    const newOrder = {
      userInfo: { formData, user_id: user._id },
      cart: cart,
      createdAt: new Date(),
      status: 'pending',
    };

    await ordersCollection.insertOne(newOrder);

    await sendEmail({
      to: formData.email,
      subject: 'Commande Heatz',
      text: `Merci pour votre commande!`,
    });
    await sendEmail({
      to: process.env.Heatz_Email,
      subject: 'Commande Heatz',
      text: `Une nouvelle commande vient d'être prise!`,
    });

    client.close();
    return NextResponse.json({ message: 'Commande créée avec succès!' }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}