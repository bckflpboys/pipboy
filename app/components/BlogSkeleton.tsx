import { motion } from 'framer-motion';

export default function BlogSkeleton() {
  // Create an array of 6 items for the skeleton
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skeletonItems.map((_, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
            <div className="absolute bottom-4 left-4">
              <div className="h-6 w-20 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
