import { NextResponse } from 'next/server';
import { connectToDb } from '../../../../../lib/server/connection';
import { uploadToCloudinary } from '../../../../../lib/server/cloudinaryHelper';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const productName = formData.get('productName');
    const price = formData.get('price');
    const category = formData.get('category');
    const description = formData.get('description');
    const SKU = formData.get('SKU');
    const featuresStr = formData.get('featuresStr');
    const features = featuresStr ? featuresStr.split('$dedrno') : [];

    const productImages = formData.getAll('productImages');

    if (!productName || !price || !category || !description || !SKU) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const imageUrls = [];
    if (productImages && productImages.length > 0) {
      for (const image of productImages) {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const url = await uploadToCloudinary(buffer);
        imageUrls.push(url);
      }
    }

    const client = await connectToDb();
    const db = client.db('Heatz');
    const productsCollection = db.collection('Products');

    const existingProduct = await productsCollection.findOne({ productName });
    if (existingProduct) {
      client.close();
      return NextResponse.json({ error: 'Produit avec ce nom deja existe.' }, { status: 400 });
    }

    const newProduct = {
      productName,
      price: parseFloat(price),
      category,
      description,
      SKU,
      isActive: true,
      features,
      imageUrls,
      createdAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);
    client.close();
    return NextResponse.json({ message: 'Product added successfully!', productId: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}