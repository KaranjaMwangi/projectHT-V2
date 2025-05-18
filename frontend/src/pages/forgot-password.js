import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { resetPassword, loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      setIsSubmitting(false);
      return setMessage({ type: "error", text: "Passwords do not match." });
    }

    try {
      await resetPassword({
        phone: formData.phone,
        newPassword: formData.newPassword
      });

      const loginResponse = await loginUser({
        phone: formData.phone,
        password: formData.newPassword
      });

      handleLogin(loginResponse.token, loginResponse.user);

      setMessage({ 
        type: "success", 
        text: `Password reset successful! Welcome back ${loginResponse.user.phone || loginResponse.user.email.substring(0, 20)}...` 
      });

      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (error) {
      console.error("Password reset error:", error.response?.data || error.message);
      setMessage({
        type: "error",
        text: error.response?.data?.error || 
             error.message || 
             "An error occurred during password reset."
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
            Reset Password
          </h2>
          
          {message && (
            <div className={`alert alert-${message.type === "success" ? "success" : "danger"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="form-control"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
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
                  Processing...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Remembered your password?{" "}
              <Link href="/login" className="text-primary">
                Login here
              </Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}