import { ObjectId } from 'mongodb';

export enum UserRole {
  USER = 'user',
  BLOGGER = 'blogger',
  ADMIN = 'admin'
}

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const USERS_COLLECTION = 'users';
