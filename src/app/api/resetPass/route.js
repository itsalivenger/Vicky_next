import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import sendEmail from '../../../../lib/server/sendEmail';
import crypto from 'crypto';
import { database } from '../../../components/other/variables';

export async function POST(req) {
  const { email, domain } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      client.close();
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    await usersCollection.updateOne({ email }, { $set: { resetToken, resetTokenExpiration } });

    const resetLink = `${domain}/reset-password?token=${resetToken}`;

    const emailResult = await sendEmail({
      to: email,
      subject: 'Password Reset',
      text: `Please click the following link to reset your password: ${resetLink}`,
      html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    client.close();

    if (emailResult.success) {
      return NextResponse.json({ message: 'Password reset email sent.' }, { status: 200 });
    } else {
      console.error('Error sending password reset email:', emailResult.error);
      return NextResponse.json({ error: 'Error sending password reset email.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ error: 'Error during password reset.' }, { status: 500 });
  }
}