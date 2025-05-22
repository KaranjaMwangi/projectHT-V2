import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAdmin } from '../../api/api';

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminKey: '',
    phone: ''
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

    try {
      await registerAdmin(formData);
      setMessage({ type: 'success', text: 'Admin registration successful!' });
      router.push('/admin/login');
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.message || 'Admin registration failed' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authForm} shadow`}>
        <h2 className="text-center mb-4">Admin Registration</h2>
        
        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password (min 6 characters)</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone (optional)</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254XXXXXXXXX"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Admin Registration Key</label>
            <input
              type="password"
              className="form-control"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}