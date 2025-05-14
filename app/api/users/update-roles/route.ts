import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UserRole } from "@/models/User";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Update all users to have admin role
    const result = await db.collection('users').updateMany(
      { role: { $exists: false } }, // Find users without a role
      { $set: { role: UserRole.ADMIN } }
    );

    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} users to admin role`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Failed to update user roles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user roles' },
      { status: 500 }
    );
  }
}
