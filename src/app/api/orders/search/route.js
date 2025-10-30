import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const { searchTerm, searchBy } = await req.json();

  const limit = 10;

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const ordersCollection = db.collection('Orders');

    if (searchTerm === '') {
      const orders = await ordersCollection.find().limit(limit).toArray();
      client.close();
      return NextResponse.json({ orders }, { status: 200 });
    }

    if (!searchBy) {
      client.close();
      return NextResponse.json({ error: 'Missing searchBy in request body.' }, { status: 400 });
    }

    let orders;
    if (searchBy === '_id') {
      orders = await ordersCollection.aggregate([
        {
          $addFields: {
            idString: { $toString: "$_id" }
          }
        },
        {
          $match: {
            idString: { $regex: new RegExp(searchTerm, 'i') }
          }
        },
        {
          $limit: limit
        }
      ]).toArray();
    } else if (searchBy === 'email') {
      orders = await ordersCollection.find({ 'userInfo.formData.email': { $regex: new RegExp(searchTerm, 'i') } }).limit(limit).toArray();
    } else {
      client.close();
      return NextResponse.json({ error: 'Invalid search field.' }, { status: 400 });
    }

    client.close();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error searching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}