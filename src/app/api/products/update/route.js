import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';
import { database } from '../../../../components/other/variables';

export async function PUT(req) {
  const { updatedData, _id: productId } = await req.json();

  if (!ObjectId.isValid(productId)) {
    return NextResponse.json({ error: 'Invalid product ID.' }, { status: 400 });
  }

  const { _id, ...dataToUpdate } = updatedData;

  if (Object.keys(dataToUpdate).length === 0) {
    return NextResponse.json({ message: 'No valid fields to update.' }, { status: 200 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const productsCollection = db.collection('Products');

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: dataToUpdate }
    );

    client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'No changes made to the product.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Product updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}