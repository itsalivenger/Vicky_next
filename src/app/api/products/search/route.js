import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';

export async function POST(req) {
  const { searchVal } = await req.json();

  if (!searchVal || searchVal.trim() === '') {
    return NextResponse.json({ error: 'Search value cannot be empty.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const productsCollection = db.collection('Products');

    const products = await productsCollection.find({
      $or: [
        { productName: { $regex: searchVal.trim(), $options: "i" } },
        { SKU: { $regex: searchVal.trim(), $options: "i" } },
        { category: { $regex: searchVal.trim(), $options: "i" } }
      ]
    }).toArray();

    client.close();

    if (products.length === 0) {
      return NextResponse.json({ error: 'No products found.' }, { status: 403 });
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}