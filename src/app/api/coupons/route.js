import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import { database } from '../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const coupCollection = db.collection('Coupons');

    const coupons = await coupCollection.find().toArray();
    client.close();
    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const coupCollection = db.collection('Coupons');

    const coupon = await req.json();

    const result = await coupCollection.insertOne(coupon);
    client.close();
    return NextResponse.json({ ...coupon, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error adding coupon:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}