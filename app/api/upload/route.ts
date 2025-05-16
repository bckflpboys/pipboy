import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { image, blogId, type } = data;

    if (!image) {
      return NextResponse.json(
        { error: 'Missing image data' },
        { status: 400 }
      );
    }

    // Generate a unique ID if blogId is not provided
    const id = blogId || nanoid();
    const imageUrl = await uploadImage(image, id, type as 'cover' | 'content');
    return NextResponse.json({ url: imageUrl });
  } catch (error: unknown) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error uploading image' },
      { status: 500 }
    );
  }
}
