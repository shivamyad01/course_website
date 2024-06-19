import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, title, instructor, image, price }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{instructor}</p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          ₹{price}
        </span>
        <Link to={`/courses/${id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Detail
          </button>
        </Link>
       
      </div>
    </div>
  );
};

export default CourseCard;
