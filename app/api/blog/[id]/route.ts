import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '../../../lib/mongodb';
import { uploadImage } from '../../../lib/cloudinary';
import mongoose from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const blog = await Blog.findById(params.id).select('-__v');
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const data = await req.json();
    const blogId = params.id;

    // Handle cover art if changed
    if (data.coverArt && data.coverArt.startsWith('data:')) {
      data.coverArt = await uploadImage(data.coverArt, blogId, 'cover');
    }

    // Process content to handle any new base64 images
    if (data.content) {
      const regex = /data:image\/[^;]+;base64[^"]+/g;
      const matches = data.content.match(regex) || [];

      for (const match of matches) {
        const imageUrl = await uploadImage(match, blogId, 'content');
        data.content = data.content.replace(match, imageUrl);
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: data },
      { new: true }
    ).select('-__v');

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error updating blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error deleting blog post' },
      { status: 500 }
    );
  }
}
