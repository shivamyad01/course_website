// src/pages/Purchase.jsx

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Purchase = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedVideoIndex(0); // Reset selected video index when course is clicked
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Purchased Courses</h1>
      <div className="flex flex-wrap justify-center">
        {courses.map(course => (
          <div key={course.id} className="course-container m-4" onClick={() => handleCourseClick(course)}>
            <h2 className="text-xl">{course.title}</h2>
            <p>Instructor: {course.instructor}</p>
            <img className="w-full rounded my-4" src={course.image} alt={course.title} />
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="video-player mt-10">
          <h2 className="text-2xl font-bold text-center mb-4">{selectedCourse.title}</h2>
          <ReactPlayer url={selectedCourse.videoUrls[selectedVideoIndex]} controls width="100%" />
          <div className="video-navigation mt-4 flex justify-center">
            {selectedCourse.videoUrls.map((videoUrl, index) => (
              <div key={index} className={`video-thumbnail ${index === selectedVideoIndex ? 'selected' : ''}`} onClick={() => setSelectedVideoIndex(index)}>
                {/* You can add thumbnails or labels for each video */}
                Video {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
