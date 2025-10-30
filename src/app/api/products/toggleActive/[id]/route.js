import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';
import { database } from '../../../../../components/other/variables';

export async function PUT(req, { params }) {
  const productId = params.id;
  if (!ObjectId.isValid(productId)) {
    return NextResponse.json({ error: 'ID du produit invalide.' }, { status: 400 });
  }
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const productsCollection = db.collection('Products');
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId)
    });
    if (!product) {
      client.close();
      return NextResponse.json({ error: 'Produit introuvable.' }, { status: 404 });
    }
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { active: !product.active } }
    );
    client.close();
    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Etat du produit non modifié.' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Etat du produit modifié avec succès!' }, { status: 200 });
  } catch (error) {
    console.error('Error toggling product active state:', error);
    return NextResponse.json({ error: 'Problème lors de la modification de l\'etat du produit.' }, { status: 500 });
  }
}