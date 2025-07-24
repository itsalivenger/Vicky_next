import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const usersCollection = db.collection('Users');

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    client.close();

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}