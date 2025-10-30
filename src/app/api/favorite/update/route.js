import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
  const { favorite, user } = await req.json();

  if (!user || !ObjectId.isValid(user._id)) {
    return NextResponse.json({ error: 'Identifiant utilisateur invalide.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { favorite } }
    );

    client.close();

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Utilisateur introuvable ou favoris non modifié.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Favoris mis à jour.', favorite }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des favoris:', error);
    return NextResponse.json({ error: 'Problème lors de la mise à jour des favoris.' }, { status: 500 });
  }
}