import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const coupCollection = db.collection('Coupons');
    const { id } = params;
    const { _id, ...updatedCoupon } = await req.json();

    const result = await coupCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCoupon }
    );

    client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Coupon not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Coupon updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}