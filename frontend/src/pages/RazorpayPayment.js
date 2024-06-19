import React from 'react';

const RazorpayPayment = ({ amount, description, onSuccess, onFailure }) => {
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: description,
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        if (onSuccess) {
          onSuccess(response);
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Corporate Office"
      },
      theme: {
        color: "#F37254"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      if (onFailure) {
        onFailure(response);
      }
    });
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayPayment;
