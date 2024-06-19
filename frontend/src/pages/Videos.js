// src/pages/Videos.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../coursesData'; // Assuming courses data includes videoUrls
import VideoPlayer from './VideoPlayer.';

const Videos = ({ purchasedCourses }) => {
  const { id } = useParams(); // Fetching course ID from URL params (optional, if needed)

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Purchased Course Videos</h1>
      <div className="flex flex-wrap justify-center">
        {purchasedCourses.map(course => (
          <div key={course.id} className="course-container m-4">
            <h2 className="text-xl">{course.title}</h2>
            <p>Instructor: {course.instructor}</p>
            <img className="w-full rounded my-4" src={course.image} alt={course.title} />
            <div className="video-list mt-4">
              <h3 className="text-lg font-bold">Videos</h3>
              {course.videoUrls.map((videoUrl, index) => (
                <div key={index} className="mt-2">
                  <VideoPlayer url={videoUrl} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
