import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../../../components/other/variables';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const user_id = params.user_id;

  if (!ObjectId.isValid(user_id)) {
    return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 });
  }

  try {
    const client = await connectToDb();
    const db = client.db(database);
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ _id: new ObjectId(user_id) });
    client.close();

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }
    return NextResponse.json({ cart: user.cart }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}