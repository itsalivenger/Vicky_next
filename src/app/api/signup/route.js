import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { database } from '../../../components/other/variables';

export async function POST(req) {
  const { fullName, email, phoneNumber, password, termsAccepted } = await req.json();
  if (!fullName || !email || !password || !termsAccepted) {
    return NextResponse.json({ error: 'Tous les champs sont requis et vous devez accepter les termes.' }, { status: 400 });
  }
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      client.close();
      return NextResponse.json({ error: 'Email existant.' }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      termsAccepted,
      cart: [],
      favorite: [],
      isAdmin: false,
      role: 'user',
      createdAt: new Date()
    };
    const result = await usersCollection.insertOne(newUser);
    const token = jwt.sign(
      { email: newUser.email, id: result.insertedId, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    client.close();
    return NextResponse.json({
      message: 'Utilisateur créé avec succès!',
      token,
      user: {
        id: result.insertedId,
        fullName: newUser.fullName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        role: newUser.role,
        cart: newUser.cart
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}