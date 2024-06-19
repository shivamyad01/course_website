import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import { courses } from '../coursesData'; // Adjust the path as necessary

const Videos = () => {
  const { id } = useParams(); // Fetching course ID from URL params

  // Find the purchased course with the matching ID
  const course = courses.find(course => course.id === parseInt(id));

  if (!course) {
    return <div className="mt-20 text-center text-red-500">Course not found</div>;
  }

  return (
    <div className="mt-20 mx-auto max-w-7xl px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Purchased Course Videos - {course.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {course.videoUrls.map((videoUrl, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <ReactPlayer
              url={videoUrl}
              className="w-full h-64 md:h-80"
              controls
              light={true}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { modestbranding: 1, controls: 1, rel: 0, fs: 1 }, // Enable full-screen support for YouTube
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
