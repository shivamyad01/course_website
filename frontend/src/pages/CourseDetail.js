// src/pages/CourseDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate to programmatically navigate
import { courses } from '../coursesData';

const CourseDetail = ({ onCourseSelect }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const course = courses.find(course => course.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleBuyNow = () => {
    onCourseSelect(course);
    navigate(`/buy/${id}`); // Navigate to the buy route for this course
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p>Instructor: {course.instructor}</p>
      <img className="w-full rounded my-4" src={course.image} alt={course.title} />
      <p>Price: ₹{course.price}</p>
      <button
        onClick={handleBuyNow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};

export default CourseDetail;
