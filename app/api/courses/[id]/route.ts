import { NextResponse } from 'next/server';
import { CourseModel } from '../../../models/CourseModel';
import { uploadCourseFile } from '../../../lib/courseUpload';
import mongoose from 'mongoose';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const { id: courseId } = await params;
    const contentType = request.headers.get('content-type') || '';
    
    let courseData;
    let thumbnail = null;

    // Handle different content types
    if (contentType.includes('multipart/form-data')) {
      // Handle form data with files
      const formData = await request.formData();
      courseData = JSON.parse(formData.get('courseData') as string);
      thumbnail = formData.get('thumbnail') as File;
    } else {
      // Handle JSON data
      courseData = await request.json();
    }

    // Find the existing course
    const existingCourse = await CourseModel.findOne({ id: courseId });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Upload new thumbnail if provided
    if (thumbnail) {
      courseData.thumbnail = await uploadCourseFile(thumbnail, courseId, 'thumbnail');
    }

    // Update the course
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { id: courseId },
      { 
        $set: {
          title: courseData.title,
          description: courseData.description,
          status: courseData.status,
          thumbnail: courseData.thumbnail || existingCourse.thumbnail,
          updatedAt: new Date().toISOString()
        }
      },
      { new: true }
    );

    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const { id: courseId } = await params;
    const course = await CourseModel.findOne({ id: courseId });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const { id: courseId } = await params;
    const course = await CourseModel.findOneAndDelete({ id: courseId });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
