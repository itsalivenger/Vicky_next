import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import sendEmail from '../../../../lib/server/sendEmail';

export async function POST(req) {
  const { email } = await req.json();

  const emailRegex = /^[^
@]+@[^
@]+\.[^
@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Format invalide de l\'email' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const subscribersCollection = db.collection('Subscribers');

    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      client.close();
      return NextResponse.json({ error: 'l\'email existe déja.' }, { status: 400 });
    }

    await subscribersCollection.insertOne({ email, subscribedAt: new Date() });

    const emailResult = await sendEmail({
      to: email,
      subject: 'Inscription à notre newsletter confirme',
      text: `Bonjour ,

Merci pour votre inscription à notre newsletter. Nous vous remercions de votre confiance et de votre soutien.

Cordialement,
L\'équipe de Heatz`,
    });

    client.close();

    if (emailResult.success) {
      return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
    } else {
      console.error('Error sending confirmation email:', emailResult.error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during subscription:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const subscribersCollection = db.collection('Subscribers');

    const subscribers = await subscribersCollection.find().limit(10).toArray();
    client.close();
    return NextResponse.json({ subscribers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}