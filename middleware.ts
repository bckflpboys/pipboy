import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { UserRole } from "@/models/User";

// Enhanced middleware to handle subdomain routing and dashboard protection
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
      pathname.startsWith('/pb-chat') ||
      pathname.startsWith('/api/auth') // Don't rewrite Next-Auth API routes
    ) {
      return NextResponse.next();
    }
    
    // Create a new URL for rewriting to the pb-chat route
    const url = new URL('/pb-chat' + (pathname === '/' ? '' : pathname), req.url);
    
    // Use rewrite to keep the original URL in the browser but serve the content from the pb-chat route
    // This ensures the dedicated pb-chat layout is used without the main Navbar
    return NextResponse.rewrite(url);
  }
  
    // For dashboard routes, the withAuth middleware will handle auth
  // This code won't actually run for dashboard routes because of the matcher config
  
  // For all other routes, continue
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
        // Redirect non-admin users to home page with a message
        const redirectUrl = new URL('/', req.url);
        redirectUrl.searchParams.set('message', 'You do not have permission to access the dashboard');
        return NextResponse.redirect(redirectUrl);
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      // Only authorize if token exists (user is logged in)
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