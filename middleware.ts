import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { UserRole } from "@/models/User"

export default withAuth(
  function middleware(req) {
    console.log('Middleware - Token:', req.nextauth.token)
    const token = req.nextauth.token

    // Check if user is trying to access dashboard
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
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
  ]
}