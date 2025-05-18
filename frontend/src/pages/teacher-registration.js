import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerTeacher } from "../api/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => {
    const kenyanRegex = /^\+254\d{9}$/;
    return kenyanRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!validatePhone(formData.phone)) {
      setMessage({ 
        type: "error", 
        text: "Please enter a valid Kenyan phone number (+254 followed by 9 digits)" 
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setIsSubmitting(false);
      return;
    }

    try {
      const teacherData = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        subject: formData.subject.trim(),
        phone: formData.phone.trim()
      };

      const response = await registerTeacher(teacherData);
      const responseData = response?.data || response;
      
      if (!responseData) {
        throw new Error("Empty response from server");
      }

      const token = responseData.token || responseData.accessToken;
      const teacher = responseData.teacher || responseData.user;

      if (!token || !teacher) {
        throw new Error("Response missing token or user data");
      }

      handleLogin(token, {
        ...teacher,
        role: 'teacher',
        phone: teacher.phone || teacherData.phone,
        email: teacher.email || teacherData.email
      });

      setMessage({ 
        type: "success", 
        text: `Registration successful! Welcome ${teacher.name || teacherData.name}` 
      });

      setTimeout(() => router.push('/'), 1500);

    } catch (error) {
      console.error("Full error details:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      setMessage({
        type: "error",
        text: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={`${styles.authContainer} py-4`}>
        <div className={`${styles.forms} shadow col-md-8 col-lg-6 col-xl-4 mx-auto`}>
          <h2 className='text-primary text-center mb-3'>
            Teacher Registration
          </h2>
          
          {message && (
            <div className={`alert alert-${message.type === "success" ? "success" : "danger"} fade show`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="+254XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Teaching Subject <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-pressed={showConfirmPassword}
                >
                  <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  Registering...
                </>
              ) : (
                "Register as Teacher"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-2">
              Already have an account?{" "}
              <Link href="/login" className="text-primary fw-semibold">
                Login here
              </Link>
            </p>
            <p>
              Registering as student?{" "}
              <Link href="/register" className="text-primary fw-semibold">
                Student registration
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}