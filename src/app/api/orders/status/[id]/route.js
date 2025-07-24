import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  const orderId = params.id;
  const { newStatus } = await req.json();

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const ordersCollection = db.collection('Orders');

    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: newStatus } }
    );

    client.close();

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Order not found or status not changed.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order status updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}