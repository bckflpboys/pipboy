import { Metadata } from 'next';
import { Blog } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const blog = await Blog.findOne({ slug: params.id });

    if (!blog) {
      return {
        title: 'Blog Post Not Found | PipBoy Hub',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${blog.title} | PipBoy Hub`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: 'article',
        publishedTime: blog.publishedAt,
        authors: [blog.author],
        tags: blog.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        creator: '@pipboyhub',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | PipBoy Hub',
      description: 'An error occurred while generating the page metadata.',
    };
  }
}
