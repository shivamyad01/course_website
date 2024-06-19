import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const BillingModal = ({ course, open, onClose, onPurchase }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const discount = 10; // Assume a 10% discount for this example
  const finalPrice = course.price - (course.price * discount) / 100;

  const handlePayment = () => {
    // Simulate a successful payment
    alert(`Payment successful! You have purchased: ${course.title}`);
    onPurchase(course);
    onClose();
    navigate('/purchase'); // Redirect to the purchase page after successful purchase
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Billing Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body1">Instructor: {course.instructor}</Typography>
        <img className="w-full rounded my-4" src={course.image} alt={course.title} />
        <Typography variant="body1">Price: ₹{course.price}</Typography>
        <Typography variant="body1">Discount: {discount}%</Typography>
        <Typography variant="h6">Final Price: ₹{finalPrice}</Typography>
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
        <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pay
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default BillingModal;
