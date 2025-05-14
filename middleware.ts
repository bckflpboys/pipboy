import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { UserRole } from "@/models/User";

// Enhanced middleware to handle subdomain routing
export function middleware(req: NextRequest) {
  // Check for subdomain
  const hostname = req.headers.get('host') || ''
  const isPbSubdomain = hostname.startsWith('pb.') || hostname === 'pb.localhost:3000'
  
  // Handle PB subdomain requests
  if (isPbSubdomain) {
    // Extract the pathname from the request URL
    const { pathname } = req.nextUrl;
    
    // Don't rewrite static asset requests to ensure styles load properly
    if (
      pathname.startsWith('/_next/') || 
      pathname.includes('.') ||     // Files with extensions (css, js, etc.)
      pathname.startsWith('/pb-chat')
    ) {
      return NextResponse.next();
    }
    
    // Create a new URL for rewriting to the pb-chat route
    const url = new URL('/pb-chat' + (pathname === '/' ? '' : pathname), req.url);
    
    // Use rewrite to keep the original URL in the browser but serve the content from the pb-chat route
    // This ensures the dedicated pb-chat layout is used without the main Navbar
    return NextResponse.rewrite(url);
  }
  
  // For non-dashboard routes, just continue
  if (!req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }
  
  // For dashboard routes, the withAuth middleware will handle auth
  // This code won't actually run for dashboard routes because of the matcher config
  return NextResponse.next()
}

// Separate auth middleware for dashboard routes only
// Auth middleware is applied separately through Next.js config
export const authConfig = withAuth(
  // Dashboard routes are protected by role
  function(req) {
    const { nextauth } = req;
    const { token } = nextauth;
    
    // Check if user is admin for dashboard access
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (token?.role !== UserRole.ADMIN) {
        // Redirect non-admin users to home page
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

export const config = {
  matcher: [
    // Match all paths for subdomain handling
    '/:path*',
    // Match dashboard routes for auth protection
    '/dashboard/:path*'
  ]
}