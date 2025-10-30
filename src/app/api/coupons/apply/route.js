import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { database } from '../../../../components/other/variables';

export async function POST(req) {
  try {
    const { promoCode, cartTotal } = await req.json();
    if (!promoCode) {
      return NextResponse.json({ error: 'Promo code is required.' }, { status: 400 });
    }

    const client = await connectToDb();
    const db = client.db(database);
    const couponsCollection = db.collection('Coupons');

    const coupon = await couponsCollection.findOne({
      code: promoCode,
      isActive: true
    });

    if (!coupon) {
      client.close();
      return NextResponse.json({ error: 'Invalid or expired promo code.' }, { status: 404 });
    }

    const currentDate = new Date();
    const expirationDate = new Date(coupon.expirationDate);
    if (currentDate > expirationDate) {
      client.close();
      return NextResponse.json({ error: 'Promo code has expired.' }, { status: 400 });
    }

    if (cartTotal < coupon.minimumAmount) {
      client.close();
      return NextResponse.json({
        error: `Cart total must be at least ${coupon.minimumAmount} to use this promo code.`
      }, { status: 400 });
    }

    let discountAmount = 0;

    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      discountAmount = Math.min(cartTotal, coupon.discountValue);
    }

    const newTotal = cartTotal - discountAmount;

    client.close();
    return NextResponse.json({
      discount: discountAmount,
      newTotal: newTotal,
    }, { status: 200 });

  } catch (error) {
    console.error('Error applying promo code:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}