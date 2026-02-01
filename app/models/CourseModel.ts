import mongoose from 'mongoose';
import type { Course, Chapter, Video, Resource } from './Course';

const ResourceSchema = new mongoose.Schema<Resource>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'link', 'file'], required: true },
  url: { type: String, required: true },
  size: { type: String }
});

const VideoSchema = new mongoose.Schema<Video>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  order: { type: Number, required: true }
});

const ChapterSchema = new mongoose.Schema<Chapter>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  videos: [VideoSchema],
  resources: [ResourceSchema],
  order: { type: Number, required: true }
});

const CourseSchema = new mongoose.Schema<Course>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  chapters: [ChapterSchema],
  totalVideos: { type: Number, required: true },
  totalDuration: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

export const CourseModel = mongoose.models.Course || mongoose.model('Course', CourseSchema);
