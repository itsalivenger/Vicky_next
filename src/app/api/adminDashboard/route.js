import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../lib/server/connection';

export async function GET() {
  try {
    const client = await connectToDb();
    const db = client.db('Heatz');
    const ordersCollection = db.collection('Orders');
    const usersCollection = db.collection('Users');

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const orders = await ordersCollection.find({ createdAt: { $gte: startOfDay } }).toArray();

    const salesOfToday = orders.reduce((total, order) =>
      total + order.cart.reduce((subTotal, item) => subTotal + (item.price * item.quantity), 0), 0);

    const numOfOrders = orders.length;

    const nombreDesProduitsVendus = orders.reduce((total, order) =>
      total + order.cart.reduce((subTotal, item) => subTotal + item.quantity, 0), 0);

    const usersThisLastWeek = await usersCollection.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    client.close();

    return NextResponse.json({
      salesOfToday,
      numOfOrders,
      usersThisLastWeek,
      nombreDesProduitsVendus
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}