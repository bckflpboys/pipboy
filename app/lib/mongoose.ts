import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log('New database connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
