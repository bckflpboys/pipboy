import { useState } from 'react';
import ResourceViewer from '../../components/ResourceViewer';
import { ChevronDownIcon, ChevronUpIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';

// Define the resource types
type ResourceType = 'image' | 'document' | 'other';

// Interface for resource items
interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  chapterId: string;
  allowDownload?: boolean;
}

// Interface for chapter items
interface Chapter {
  id: string;
  title: string;
  resources: Resource[];
}

// Interface for course items
interface Course {
  id: string;
  title: string;
  chapters: Chapter[];
}

// Sample data for demonstration
const sampleCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Web Development',
    chapters: [
      {
        id: 'chapter-1',
        title: 'HTML Basics',
        resources: [
          {
            id: 'resource-1',
            title: 'HTML Cheat Sheet',
            url: 'https://htmlcheatsheet.com/HTML-Cheat-Sheet.pdf',
            type: 'document',
            chapterId: 'chapter-1',
            allowDownload: true
          },
          {
            id: 'resource-2',
            title: 'HTML Structure Diagram',
            url: 'https://www.w3schools.com/html/img_sem_elements.gif',
            type: 'image',
            chapterId: 'chapter-1'
          }
        ]
      },
      {
        id: 'chapter-2',
        title: 'CSS Fundamentals',
        resources: [
          {
            id: 'resource-3',
            title: 'CSS Box Model',
            url: 'https://www.w3schools.com/css/box-model.gif',
            type: 'image',
            chapterId: 'chapter-2'
          },
          {
            id: 'resource-4',
            title: 'CSS Reference Guide',
            url: 'https://cdn.rawgit.com/hostinger/banners/94a1d371/tutorials/pdf/CSS-3-Cheatsheet.pdf',
            type: 'document',
            chapterId: 'chapter-2',
            allowDownload: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'JavaScript Essentials',
    chapters: [
      {
        id: 'chapter-3',
        title: 'Variables and Data Types',
        resources: [
          {
            id: 'resource-5',
            title: 'JavaScript Data Types Overview',
            url: 'https://www.tutorialspoint.com/javascript/images/javascript_data_types.jpg',
            type: 'image',
            chapterId: 'chapter-3'
          }
        ]
      },
      {
        id: 'chapter-4',
        title: 'Functions and Objects',
        resources: [
          {
            id: 'resource-6',
            title: 'JavaScript Functions Guide',
            url: 'https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf',
            type: 'document',
            chapterId: 'chapter-4',
            allowDownload: true
          }
        ]
      }
    ]
  }
];

// Component for displaying a resource card
const ResourceCard = ({ resource, onClick }: { resource: Resource; onClick: (resource: Resource) => void }) => {
  return (
    <div 
      className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onClick(resource)}
    >
      <div className="flex items-center">
        {resource.type === 'image' ? (
          <PhotoIcon className="w-6 h-6 text-blue-500 mr-3" />
        ) : (
          <DocumentIcon className="w-6 h-6 text-red-500 mr-3" />
        )}
        <div>
          <h4 className="font-medium">{resource.title}</h4>
          <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
        </div>
      </div>
    </div>
  );
};

// Component for displaying a chapter with its resources
const ChapterCard = ({ 
  chapter, 
  onExpand, 
  isExpanded, 
  onResourceClick 
}: { 
  chapter: Chapter; 
  onExpand: (chapterId: string) => void; 
  isExpanded: boolean; 
  onResourceClick: (resource: Resource) => void;
}) => {
  return (
    <div className="border rounded-md mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => onExpand(chapter.id)}
      >
        <h3 className="font-semibold">{chapter.title}</h3>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {chapter.resources.length > 0 ? (
            chapter.resources.map(resource => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                onClick={onResourceClick} 
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No resources available for this chapter.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Main ResourceManagement component
export default function ResourceManagement() {
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [courses] = useState<Course[]>(sampleCourses);
  
  // Handle chapter expansion
  const onChapterExpand = (chapterId: string) => {
    setExpandedChapterId(prevId => prevId === chapterId ? null : chapterId);
  };
  
  // Handle resource selection
  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
  };
  
  // Close the resource viewer
  const closeResourceViewer = () => {
    setSelectedResource(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Course Resources</h1>
      
      {courses.map(course => (
        <div key={course.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
          
          {course.chapters.map(chapter => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              onExpand={onChapterExpand}
              isExpanded={expandedChapterId === chapter.id}
              onResourceClick={handleResourceClick}
            />
          ))}
        </div>
      ))}
      
      {/* Resource Viewer Modal */}
      {selectedResource && (
        <ResourceViewer
          resourceUrl={selectedResource.url}
          title={selectedResource.title}
          onClose={closeResourceViewer}
          allowDownload={selectedResource.allowDownload}
        />
      )}
    </div>
  );
}
