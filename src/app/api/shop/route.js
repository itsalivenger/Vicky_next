import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';

const loadLimit = 24;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const startIndex = parseInt(searchParams.get('n')) || 0;
  const category = searchParams.get('category') || 'earphones';

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const productsCollection = db.collection('Products');

    const products = await productsCollection.find({ category: category })
      .skip(startIndex)
      .limit(loadLimit)
      .toArray();

    client.close();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}