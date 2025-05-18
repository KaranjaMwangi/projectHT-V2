import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { loginUser } from "../api/api";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const loginData = {
        password: formData.password,
        [loginMethod]: formData[loginMethod]
      };

      const response = await loginUser(loginData);
      
      if (!response) throw new Error("No response from server");

      handleLogin(response.token, response.user);
      setMessage({ 
        type: "success", 
        text: response.message || "Login successful!" 
      });

      router.push('/');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage({
        type: "error",
        text: error.response?.data?.error || 
             error.message || 
             "Login failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod((prev) => (prev === "phone" ? "email" : "phone"));
    setMessage(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={`${styles.authContainer} py-4`}>
        <div className={`${styles.forms} shadow col-md-6 col-lg-4 mx-auto`}>
          <h2 className={`text-primary text-center mb-3`}>Login</h2>
          
          {message && (
            <div className={`alert alert-${message.type === "success" ? "success" : "danger"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                {loginMethod === "phone" ? (
                  <label htmlFor="phone" className="form-label mb-0">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                ) : (
                  <label htmlFor="email" className="form-label mb-0">
                    Email <span className="text-danger">*</span>
                  </label>
                )}
                <button 
                  type="button" 
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={toggleLoginMethod}
                >
                  {loginMethod === "phone" ? "Use Email Instead" : "Use Phone Instead"}
                </button>
              </div>
              
              {loginMethod === "phone" ? (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="^\+254\d{9}$"
                  title="Kenyan format: +254 followed by 9 digits"
                  required
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-2">
              <Link href="/forgot-password" className="text-primary">
                Forgot Password?
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