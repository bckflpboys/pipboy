import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '../../../../models/CourseModel';
import type { Chapter, Video, Resource } from '../../../../models/Course';
import { uploadCourseFile } from '../../../../lib/courseUpload';
import mongoose from 'mongoose';

interface ChapterInput extends Omit<Chapter, 'videos' | 'resources'> {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    url?: string;
    previewUrl?: string;
    duration: string;
    order: number;
    file?: string;
    thumbnailFile?: string;
  }>;
  resources: Array<{
    id: string;
    title: string;
    type: Resource['type'];
    url: string;
    size?: string;
    file?: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    const formData = await request.formData();
    const chaptersData = JSON.parse(formData.get('chaptersData') as string);
    const courseId = formData.get('courseId') as string;

    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    // Process each chapter and handle file uploads
    const processedChapters = await Promise.all(chaptersData.map(async (chapter: ChapterInput) => {
      // Process videos
      const processedVideos = await Promise.all(chapter.videos.map(async (video) => {
        let videoUrl = video.url;
        let thumbnailUrl = video.previewUrl;

        // Upload video file if present
        if (video.file) {
          const videoFile = formData.get(video.file) as File;
          if (videoFile) {
            videoUrl = await uploadCourseFile(videoFile, courseId, 'video');
          }
        }

        // Upload thumbnail file if present
        if (video.thumbnailFile) {
          const thumbnailFile = formData.get(video.thumbnailFile) as File;
          if (thumbnailFile) {
            thumbnailUrl = await uploadCourseFile(thumbnailFile, courseId, 'thumbnail');
          }
        }

        return {
          id: video.id,
          title: video.title,
          description: video.description,
          url: videoUrl,
          thumbnail: thumbnailUrl,
          duration: video.duration,
          order: video.order
        };
      }));

      // Process resources
      const processedResources = await Promise.all(chapter.resources.map(async (resource) => {
        let resourceUrl = resource.url;

        // Upload resource file if present
        if (resource.file) {
          const resourceFile = formData.get(resource.file) as File;
          if (resourceFile) {
            resourceUrl = await uploadCourseFile(resourceFile, courseId, 'resource');
          }
        }

        return {
          id: resource.id,
          title: resource.title,
          type: resource.type,
          url: resourceUrl,
          size: resource.size
        };
      }));

      return {
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        videos: processedVideos,
        resources: processedResources,
        order: chapter.order
      };
    }));

    // Calculate total videos and duration
    const totalVideos = processedChapters.reduce((total: number, chapter: Chapter) => total + chapter.videos.length, 0);
    const totalDurationMinutes = processedChapters.reduce((total: number, chapter: Chapter) => {
      const minutes = chapter.videos.reduce((totalMins: number, video: Video) => {
        const [mins, secs] = video.duration.split(':').map(Number);
        return totalMins + mins + Math.floor(secs / 60);
      }, 0);
      return total + minutes;
    }, 0);

    const totalDuration = `${Math.floor(totalDurationMinutes / 60)}h ${totalDurationMinutes % 60}m`;

    // Update the course with new chapters and recalculated totals
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { id },
      { 
        $set: { 
          chapters: processedChapters,
          totalVideos,
          totalDuration
        } 
      },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error('Error updating chapters:', error);
    return NextResponse.json(
      { error: 'Failed to update chapters' },
      { status: 500 }
    );
  }
}
