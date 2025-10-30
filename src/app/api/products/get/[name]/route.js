import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../../lib/server/connection';
import { database } from '../../../../../components/other/variables';

export async function POST(req, { params }) {
  const searchVal = params.name;
  const { searchBy } = await req.json();

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const productsCollection = db.collection('Products');

    let query = {};
    if (searchVal.toLowerCase() === 'all') {
      query = {};
    } else {
      query = { [searchBy]: { $regex: new RegExp(searchVal, 'i') } };
    }

    const products = await productsCollection.find(query).toArray();

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