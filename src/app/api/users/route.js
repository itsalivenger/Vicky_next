import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import { database } from '../../../components/other/variables';

export async function GET() {
  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');
    const users = await usersCollection.find().toArray();
    client.close();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}