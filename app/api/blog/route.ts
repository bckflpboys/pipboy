import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '../../lib/mongodb';
import { uploadImage } from '../../lib/cloudinary';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const data = await req.json();
    const blogId = nanoid();
    
    // Handle cover art if present
    if (data.coverArt && data.coverArt.startsWith('data:')) {
      const uploadedUrl = await uploadImage(data.coverArt, blogId, 'cover');
      
      // If this is just a cover image upload (type: 'cover'), return the URL directly
      if (data.type === 'cover') {
        return NextResponse.json({ coverArt: uploadedUrl });
      }
      
      // Otherwise, save the URL for the blog post
      data.coverArt = uploadedUrl;
    }

    // Process content to handle any base64 images
    if (data.content) {
      const regex = /data:image\/[^;]+;base64[^"]+/g;
      const matches = data.content.match(regex) || [];

      for (const match of matches) {
        const imageUrl = await uploadImage(match, blogId, 'content');
        data.content = data.content.replace(match, imageUrl);
      }
    }

    // Create slug from title if this is a full blog post (not just an image upload)
    if (data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const blog = await Blog.create(data);
    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error creating blog post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const { searchParams } = new URL(req.url);
    const query: {
      $text?: { $search: string };
      category?: string;
      status?: string;
      tags?: string;
    } = {};

    // Handle search
    const search = searchParams.get('search');
    if (search) {
      query.$text = { $search: search };
    }

    // Handle category filter
    const category = searchParams.get('category');
    if (category) {
      query.category = category;
    }

    // Handle status filter
    const status = searchParams.get('status');
    if (status) {
      query.status = status;
    }

    // Handle tag filter
    const tag = searchParams.get('tag');
    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query)
      .sort({ isFeatured: -1, createdAt: -1 }) // Sort featured posts first, then by date
      .select('-__v');

    return NextResponse.json(blogs);
  } catch (error: unknown) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching blog posts' },
      { status: 500 }
    );
  }
}
