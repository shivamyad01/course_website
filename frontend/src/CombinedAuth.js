import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from './redux/userSlice';

const CombinedAuth = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isLogin: true, // Default to login mode
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, isLogin } = formData;

    dispatch(loginRequest());

    try {
      let url;
      let requestData;

      if (isLogin) {
        url = 'http://localhost:5001/auth/login';
        requestData = { username, password };
      } else {
        url = 'http://localhost:5001/auth/register';
        requestData = { username, email, password };
      }

      const response = await axios.post(url, requestData);

      toast.success(`${isLogin ? 'Login' : 'Registration'} successful`);
      console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, response.data);

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data.user));
        // Close the login page upon successful login
        onClose();
        // Optionally redirect or handle further actions after successful login
      } else {
        // Switch to login mode on successful registration
        setFormData({ ...formData, isLogin: true });
      }
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error.response.data);
      toast.error(`${isLogin ? 'Login' : 'Registration'} failed`);
      dispatch(loginFailure(error.response.data));
    }
  };

  const toggleForm = () => {
    setFormData({ ...formData, isLogin: !formData.isLogin });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-8 rounded shadow-md w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">{formData.isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          {!formData.isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={!formData.isLogin} // Only required for registration
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
            {formData.isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>{formData.isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button onClick={toggleForm} className="text-blue-500 hover:underline ml-2">
            {formData.isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedAuth;
