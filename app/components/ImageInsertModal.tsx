import { useState, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImageInsertModalProps {
  onClose: () => void;
  onInsert: (imageUrl: string) => void;
}

export default function ImageInsertModal({ onClose, onInsert }: ImageInsertModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onInsert(imageUrl.trim());
      onClose();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Here you would typically upload the file to your server/storage
    setIsUploading(true);
    try {
      // TODO: Replace with your actual upload logic
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      // const data = await response.json();
      // onInsert(data.url);
      
      // For now, we'll just use the object URL
      onInsert(objectUrl);
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error (show message to user)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Insert Image</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <button
              type="submit"
              disabled={!imageUrl.trim()}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert URL
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-colors"
              >
                <div className="space-y-2">
                  <span className="block text-gray-400">
                    {isUploading ? 'Uploading...' : 'Click to upload an image'}
                  </span>
                  <span className="block text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </div>
              </button>
            </div>

            {previewUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
