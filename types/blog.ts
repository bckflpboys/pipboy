import { BlogCategory } from "../app/utils/constants";

export interface BlogPost {
  isFeatured?: boolean;
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  coverArt?: string;
  category: BlogCategory;
  tags: string[];
  readTime: number;
  status: 'draft' | 'published';
  publishedAt: Date;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogFormData extends Omit<BlogPost, 'publishedAt' | 'readTime'> {
  publishedAt?: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
