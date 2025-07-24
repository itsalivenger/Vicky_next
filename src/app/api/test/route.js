import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    // You can access form fields like this:
    // const someField = formData.get('someField');
    // const imageFile = formData.get('image');

    // For testing purposes, we'll just acknowledge the upload
    return NextResponse.json({ message: 'File upload test successful (no file saved to disk).', receivedFields: Array.from(formData.keys()) }, { status: 200 });
  } catch (error) {
    console.error('Error in test route:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}