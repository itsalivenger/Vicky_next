import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../../lib/server/connection';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const coupCollection = db.collection('Coupons');
    const { id } = params;

    const result = await coupCollection.deleteOne({ _id: new ObjectId(id) });
    client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Coupon not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Coupon deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}