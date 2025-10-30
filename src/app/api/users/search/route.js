import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../../components/other/variables';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('searchTerm') || '';

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const regex = new RegExp(searchTerm, 'i');

    const users = await usersCollection.find({
      $or: [
        { fullName: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    }).toArray();

    client.close();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}