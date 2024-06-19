// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Drawer from './Drawer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Purchase from './pages/Purchase';
import BillingModal from './pages/BillingModal';
import Videos from './pages/Videos'; // Import Videos component
import { courses } from './coursesData'; // Import courses data

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const handlePurchase = (course) => {
    setPurchasedCourses([...purchasedCourses, course]);
  };

  const handleOpenBillingModal = (course) => {
    setSelectedCourse(course);
    setBillingModalOpen(true);
  };

  const handleCloseBillingModal = () => {
    setSelectedCourse(null);
    setBillingModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Drawer />
        
        <Routes>
          <Route path="/" element={<Home onCourseSelect={handleOpenBillingModal} />} />
          <Route path="/courses/:id" element={<CourseDetail onCourseSelect={handleOpenBillingModal} />} />
          <Route path="/buy/:id" element={<CourseDetail onCourseSelect={handleOpenBillingModal} />} />
          <Route path="/purchase" element={<Purchase courses={purchasedCourses} />} />
          <Route path="/purchase/:id" element={<Purchase courses={purchasedCourses} />} /> {/* Route for individual purchased course */}
          <Route path="/purchase/:id/videos" element={<Videos purchasedCourses={purchasedCourses} />} /> {/* Route for videos component */}
        </Routes>

        {selectedCourse && (
          <BillingModal
            course={selectedCourse}
            open={billingModalOpen}
            onClose={handleCloseBillingModal}
            onPurchase={handlePurchase}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
