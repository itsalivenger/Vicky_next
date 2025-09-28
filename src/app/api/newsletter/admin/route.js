import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import sendEmail from '../../../../../lib/server/sendEmail';

export async function POST(req) {
  const { subject, emailContent } = await req.json();

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const subscribersCollection = db.collection('Subscribers');

    const subscribers = await subscribersCollection.find().toArray();

    if (!subscribers.length) {
      client.close();
      return NextResponse.json({ error: 'No subscribers found.' }, { status: 400 });
    }

    const emailPromises = subscribers.map((subscriber) =>
      sendEmail({
        from: `"Newsletter" <${process.env.EMAIL_USER}>`,
        to: subscriber.email,
        subject: subject,
        text: emailContent,
      })
    );

    await Promise.all(emailPromises);

    client.close();
    return NextResponse.json({ message: 'Emails envoyés avec success!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}