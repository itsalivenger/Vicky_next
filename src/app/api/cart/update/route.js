import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
  const { cart, user } = await req.json();

  if (!user || !ObjectId.isValid(user._id)) {
    return NextResponse.json({ error: 'Identifiant utilisateur invalide.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { cart } }
    );

    client.close();

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Panier non modifié.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Panier mis à jour.', cart }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    return NextResponse.json({ error: 'Problème lors de la mise à jour du panier.' }, { status: 500 });
  }
}