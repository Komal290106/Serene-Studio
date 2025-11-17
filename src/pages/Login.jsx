// Login.jsx - Put ONLY this in the Login.jsx file
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { login } = useAuth();
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

    const { email, password } = formData;

    if (!email || !password) {
      showToast('Please fill in all fields ❗');
      return;
    }

    setLoading(true);

    try {
      // ✅ FIXED: Must pass an OBJECT, not 2 values
      await login({ email, password });

      showToast('Welcome back! 🎉 Login successful.');
      
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="form-section">
          <span className="badge">Welcome Back</span>
          <h2>Login to Your Account</h2>
          <p>Sign in to continue your journey with Serene Studio.</p>

          <form id="loginForm" onSubmit={handleSubmit}>
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

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
          </form>
          
          <p className="note">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              Logging in...
            </div>
          )}
        </div>

        <div className="image-section">
          <div className="overlay"></div>
          <div className="quote">
            <p>"Where elegance meets personal expression in every stitch."</p>
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

export default Login;
