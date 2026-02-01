import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/models/User";

export async function GET() {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);
    
    // Check if the user is logged in and has admin role
    if (session?.user?.role === UserRole.ADMIN) {
      // User is an admin, return a JSON response indicating they have access
      return NextResponse.json({ 
        success: true, 
        message: 'Access granted', 
        role: session.user.role 
      });
    } else {
      // User is not an admin, return a JSON response indicating they don't have access
      return NextResponse.json({ 
        success: false, 
        message: 'You do not have permission to access the dashboard',
        role: session?.user?.role || 'none'
      }, { status: 403 });
    }
  } catch (error) {
    console.error('Error checking admin access:', error);
    
    // If there's an error, return a JSON response with the error
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while checking your access permissions' 
    }, { status: 500 });
  }
}
