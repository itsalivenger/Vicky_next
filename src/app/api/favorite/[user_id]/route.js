import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const user_id = params.user_id;

  if (!ObjectId.isValid(user_id)) {
    return NextResponse.json({ error: 'ID utilisateur invalide.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ _id: new ObjectId(user_id) });
    client.close();

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    return NextResponse.json({ favorite: user.favorite }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return NextResponse.json({ error: 'Problème lors de la récupération des favoris.' }, { status: 500 });
  }
}