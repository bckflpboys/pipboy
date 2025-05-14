import { NextResponse } from 'next/server';
import { CourseModel } from '../../models/CourseModel';
import { uploadCourseFile } from '../../lib/courseUpload';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const formData = await request.formData();
    const courseData = JSON.parse(formData.get('courseData') as string);
    const thumbnail = formData.get('thumbnail') as File;

    // Generate a unique ID for the course
    const courseId = nanoid();

    // Upload thumbnail
    if (thumbnail) {
      courseData.thumbnail = await uploadCourseFile(thumbnail, courseId, 'thumbnail');
    }

    // Upload videos and update their URLs
    let totalVideos = 0;
    let totalDurationSeconds = 0;

    for (const chapter of courseData.chapters) {
      chapter.id = nanoid(); // Add chapter ID

      for (const video of chapter.videos) {
        video.id = nanoid(); // Add video ID
        if (video.file) {
          video.url = await uploadCourseFile(video.file as File, courseId, 'video');
          delete video.file; // Remove the file object before saving to DB
        }
        totalVideos++;
        // Convert duration string (e.g. '5:30') to seconds
        if (video.duration) {
          const [minutes, seconds] = video.duration.split(':').map(Number);
          totalDurationSeconds += minutes * 60 + seconds;
        }
      }

      // Upload resource files
      for (const resource of chapter.resources) {
        resource.id = nanoid(); // Add resource ID
        if (resource.file) {
          resource.url = await uploadCourseFile(resource.file as File, courseId, 'resource');
          delete resource.file;
        }
      }
    }

    // Format total duration as 'HH:MM:SS'
    const hours = Math.floor(totalDurationSeconds / 3600);
    const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
    const seconds = totalDurationSeconds % 60;
    const totalDuration = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');

    // Save to database with required fields
    const course = await CourseModel.create({
      ...courseData,
      id: courseId,
      totalVideos,
      totalDuration
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}


