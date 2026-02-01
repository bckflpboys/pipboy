import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  try {
    // Fetch blog data from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${params.id}`);
    const { blog } = await response.json();

    if (!blog) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'black',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 48,
              fontWeight: 600,
            }}
          >
            Blog Post Not Found
          </div>
        ),
        { ...size }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: 48,
            position: 'relative',
          }}
        >
          {/* Background Image with Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${blog.coverArt || '/images/default-blog-cover.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4))',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Category */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.2)',
                padding: '8px 16px',
                borderRadius: 24,
                marginBottom: 24,
                border: '1px solid rgba(59, 130, 246, 0.5)',
                color: '#93c5fd',
                fontSize: 20,
              }}
            >
              {blog.category}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: 'white',
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                color: '#9ca3af',
                fontSize: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div>•</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {blog.readTime} min read
              </div>
              <div>•</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {blog.author}
              </div>
            </div>
          </div>

          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              top: 48,
              left: 48,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              style={{ borderRadius: 8 }}
            />
            <span style={{ color: 'white', fontSize: 24, fontWeight: 600 }}>
              PipBoy Hub
            </span>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Inter',
            data: await fetch(
              new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap')
            ).then((res) => res.arrayBuffer()),
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    return new ImageResponse(
      (
        <div
          style={{
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 48,
            fontWeight: 600,
          }}
        >
          Error Generating Image
        </div>
      ),
      { ...size }
    );
  }
}
