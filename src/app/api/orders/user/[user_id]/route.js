import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../../lib/server/connection';

export async function GET(request, { params }) {
  try {
    const user_id = params.user_id;

    const client = await connectToDb();
    const db = client.db('Heatz');
    const ordersCollection = db.collection('Orders');

    const orders = await ordersCollection
      .find({ 'userInfo.user_id': user_id })
      .toArray();

    await client.close();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
