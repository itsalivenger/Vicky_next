import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';
import { database } from '../../../../components/other/variables';

export async function DELETE(req, { params }) {
  const orderId = params.id;

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const ordersCollection = db.collection('Orders');

    const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });
    client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}