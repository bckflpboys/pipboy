import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '../../../lib/mongodb';
import { uploadImage } from '../../../lib/cloudinary';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
    
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const blog = await Blog.findById(id).select('-__v');
    
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
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const data = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
    
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    // Handle cover art if changed
    if (data.coverArt && data.coverArt.startsWith('data:')) {
      data.coverArt = await uploadImage(data.coverArt, id, 'cover');
    }

    // Process content to handle any new base64 images
    if (data.content) {
      const regex = /data:image\/[^;]+;base64[^"]+/g;
      const matches = data.content.match(regex) || [];

      for (const match of matches) {
        const imageUrl = await uploadImage(match, id, 'content');
        data.content = data.content.replace(match, imageUrl);
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
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
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
    
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const blog = await Blog.findByIdAndDelete(id);

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
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
