import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const { user_id, product_Id } = await req.json();

    // Validate IDs
    if (!ObjectId.isValid(user_id) || !ObjectId.isValid(product_Id)) {
      return NextResponse.json(
        { error: "Vous devez vous connecter d'abord." },
        { status: 400 }
      );
    }

    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ _id: new ObjectId(user_id) });

    if (!user) {
      await client.close();
      return NextResponse.json(
        { error: 'Utilisateur introuvable.' },
        { status: 404 }
      );
    }

    // Remove product from favorites
    user.favorite = user.favorite.filter(
      product => product._id.toString() !== product_Id
    );

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user_id) },
      { $set: { favorite: user.favorite } }
    );

    await client.close();

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Produit supprimé du favoris.', favorite: user.favorite },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du produit du favoris: ', error);
    return NextResponse.json(
      { error: 'Problème lors de la suppression du produit du favoris.' },
      { status: 500 }
    );
  }
}
