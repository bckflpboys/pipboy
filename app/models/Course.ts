export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'file';
  url: string;
  size?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  order: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  resources: Resource[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
  totalVideos: number;
  totalDuration: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}
