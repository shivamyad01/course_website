// src/pages/Purchase.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Purchase = ({ courses }) => {
  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Purchased Courses</h1>
      <div className="flex flex-wrap justify-center">
        {courses.map(course => (
          <Link to={`/purchase/${course.id}/videos`} key={course.id} className="course-link">
            <div className="course-container m-4">
              <h2 className="text-xl">{course.title}</h2>
              <p>Instructor: {course.instructor}</p>
              <img className="w-full rounded my-4" src={course.image} alt={course.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
