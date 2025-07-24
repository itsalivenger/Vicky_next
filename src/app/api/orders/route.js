import { NextResponse } from 'next/server';
import { connectToDb } from './../../../../lib/server/connection';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lastOrderId = searchParams.get('lastOrderId');
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const ordersCollection = db.collection('Orders');

    const query = {};
    if (lastOrderId) {
      query._id = { $gt: lastOrderId };
    }

    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    let sortField = {};

    if (sortBy === 'date') {
      sortField = { date: sortDirection };
    } else if (sortBy === 'amount') {
      sortField = { amount: sortDirection };
    } else if (sortBy === 'status') {
      sortField = { status: sortDirection };
    } else if (sortBy === 'clientName') {
      sortField = { clientName: sortDirection };
    }

    const orders = await ordersCollection.find(query)
      .sort(sortField)
      .limit(limit)
      .toArray();

    client.close();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}