import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      client.close();
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      client.close();
      return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    client.close();
    return NextResponse.json({
      message: 'Connexion reussie!',
      token: token,
      role: user.role,
      user
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}