import { NextResponse } from 'next/server';
const { connectToDb } = require('../../../../lib/server/connection');

export async function GET() {
  try {
    const client = await connectToDb();
    const db = client.db('Heatz'); // default DB or specify: client.db('YourDBName')
    const promoCollection = db.collection('Promo');

    // Fetch a single document
    const promo = await promoCollection.findOne({}, { projection: { check: 1, _id: 0 } });

    if (!promo) {
      return NextResponse.json({ error: 'No promo record found.' }, { status: 404 });
    }

    // Return the `check` property
    return NextResponse.json({ check: promo.check }, { status: 200 });
  } catch (error) {
    console.error('Error fetching promo:', error);
    return NextResponse.json({ error: 'Failed to fetch promo.' }, { status: 500 });
  }
}
