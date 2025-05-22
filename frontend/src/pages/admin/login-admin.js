import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/styles.module.css';
import { loginAdmin } from '../../api/api';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await loginAdmin(formData);
      
      // Store admin-specific tokens and data
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminData', JSON.stringify(response.user));
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.message || 
             (error.status === 401 
               ? 'Invalid admin credentials' 
               : 'Login failed. Please try again later.')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.authContainer} py-5`}>
      <div className={`${styles.authForm} shadow col-md-6 col-lg-4 mx-auto`}>
        <h2 className="text-center mb-4">Admin Login</h2>
        
        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password*</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                Authenticating...
              </>
            ) : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}