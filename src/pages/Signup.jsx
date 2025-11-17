// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Fix the import path
import './Signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields ❗');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match ⚠️');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long ⚠️');
      return;
    }

    setLoading(true);

    try {
      await signup({ name, email, password });
      showToast(`Welcome, ${name.split(' ')[0]}! 🎉 Account created successfully.`);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    showToast(`${provider} signup coming soon! 🚀`);
  };

  return (
    <div className="signup-container">
      <div className="container">
        <div className="form-section">
          <span className="badge">Join the Family</span>
          <h2>Create Account</h2>
          <p>Sign up to start your journey with Serene Studio.</p>

          <form id="signupForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="social-icons">
              <button 
                type="button" 
                className="social-btn"
                onClick={() => handleSocialSignup('Google')}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
              </button>
              <button 
                type="button" 
                className="social-btn"
                onClick={() => handleSocialSignup('Twitter')}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </button>
              <button 
                type="button" 
                className="social-btn"
                onClick={() => handleSocialSignup('Facebook')}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="Facebook" />
              </button>
            </div>
          </form>
          <p className="note">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              Signing up...
            </div>
          )}
        </div>

        <div className="image-section">
          <div className="overlay"></div>
          <div className="quote">
            <p>"Serene Studio pieces aren't just fashion, they're experiences woven in elegance."</p>
            <h4>- Serene Studio</h4>
          </div>
        </div>
      </div>

      {toast.show && (
        <div className="toast show">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default SignUp;