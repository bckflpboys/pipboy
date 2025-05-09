import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { User, USERS_COLLECTION } from '../../../models/User';

interface CustomSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession;
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const user = await db.collection<User>(USERS_COLLECTION).findOne({ email: session.user.email });
    
    if (!user) {
      // Create user if they don't exist
      const newUser: User = {
        name: session.user.name || '',
        email: session.user.email,
        image: session.user.image || '',
        bio: '',
        location: '',
        website: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.collection<User>(USERS_COLLECTION).insertOne(newUser);
      return NextResponse.json(newUser);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession;
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();

    // Validate bio length
    if (data.bio && data.bio.length > 500) {
      return NextResponse.json({ error: 'Bio cannot be more than 500 characters' }, { status: 400 });
    }

    const updatedUser = await db.collection<User>(USERS_COLLECTION).findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after', upsert: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
