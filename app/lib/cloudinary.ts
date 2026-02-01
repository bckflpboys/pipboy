import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string, blogId: string, type: 'cover' | 'content') => {
  try {
    // If the file is already a URL and not a base64 string, return it as is
    if (file.startsWith('http://') || file.startsWith('https://')) {
      return file;
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: `blog/${blogId}`,
      public_id: type === 'cover' ? 'cover' : `content-${Date.now()}`,
      transformation: type === 'cover' ? [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ] : [
        { width: 800, crop: 'scale' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
