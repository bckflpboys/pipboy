import mongoose from 'mongoose';
import { UserRole } from './User';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
  role: { 
    type: String, 
    enum: Object.values(UserRole),
    default: UserRole.USER 
  },
  password: { type: String },
  emailVerified: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Check if model exists before creating it
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
