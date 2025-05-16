import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define the Waitlist schema
const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  referralSource: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Get the Waitlist model (or create it if it doesn't exist)
const WaitlistModel = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema, 'pb-waitlist');

export async function POST(request: Request) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    // Parse the request body
    const { name, email, referralSource, createdAt } = await request.json();

    // Validate the required fields
    if (!name || !email || !referralSource) {
      return NextResponse.json(
        { error: 'Name, email, and referral source are required' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingEntry = await WaitlistModel.findOne({ email });
    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on our waitlist' },
        { status: 409 }
      );
    }

    // Create a new waitlist entry
    const waitlistEntry = new WaitlistModel({
      name,
      email,
      referralSource,
      createdAt: createdAt || new Date().toISOString(),
    });

    // Save the entry to the database
    await waitlistEntry.save();

    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}
