import { NextResponse } from 'next/server';
import { connectToDB } from '../../lib/mongoose';
import UserModel from '../../models/UserModel';
import type { Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    await connectToDB();
    const users = await UserModel.find({}).select('-password').sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      users: users.map((user: IUser) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        status: user.status || 'active',
        joinedAt: user.createdAt,
        lastActive: user.updatedAt,
        image: user.image
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
