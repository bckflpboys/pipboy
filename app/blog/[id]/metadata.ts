import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Fetch blog data
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${params.id}`);
  const blog = await response.json();

  if (!blog || response.status !== 200) {
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
}
