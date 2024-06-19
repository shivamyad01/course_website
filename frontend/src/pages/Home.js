// src/pages/Home.jsx

import React from 'react';
import CarouselComponent from '../pages/CarouselComponent';
import CourseCard from '../pages/CourseCard';
import { courses } from '../coursesData';

const Home = ({ onCourseSelect }) => {
  return (
    <div className="mt-20">
      <CarouselComponent />
      <h1 className="text-2xl font-bold text-center mb-6">Featured Courses</h1>
      <div className="flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-4 px-4">
        {courses.map(course => (
          <div key={course.id} className="course-container m-4" onClick={() => onCourseSelect(course)}>
            <CourseCard
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              image={course.image}
              price={course.price}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
