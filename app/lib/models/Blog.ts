import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverArt: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  readTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create text indexes for search
blogSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text',
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
