import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FAIcon from "./FAIcon";
import { useAuth } from "../context/AuthContext";

import {
  faGraduationCap,
  faHome,
  faDownload,
  faChalkboardTeacher,
  faBlog,
  faPhone,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", icon: faHome, text: "Home" },
    { href: "/grades", icon: faGraduationCap, text: "Grades" },
    { href: "/downloads", icon: faDownload, text: "Downloads" },
    { href: "/teachers", icon: faChalkboardTeacher, text: "Teachers" },
    { href: "/blog", icon: faBlog, text: "Blog" }
  ];

  const getUserDisplay = () => {
    if (!user) return '';
    return user.phone || user.email.substring(0, 10);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    handleLogout();
  };

  if (isLoading) {
    return (
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <span className={styles.brand}>
              <FAIcon icon={faGraduationCap} className="me-2" />
              HomeTeacher
            </span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <Link href="/" className="navbar-brand">
          <span className={styles.brand}>
            <FAIcon icon={faGraduationCap} className="me-2" />
            HomeTeacher
          </span>
        </Link>

        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-lg-auto">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href} className={`nav-link ${styles.navLink}`}>
                  <FAIcon icon={item.icon} className="me-1" />
                  {item.text}
                </Link>
              </li>
            ))}

            <li className="nav-item">
              <a href="tel:+254757325802" className={`nav-link ${styles.phoneIcon}`}>
                <FAIcon icon={faPhone} size="lg" />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://wa.me/254757325802"
                className={`nav-link ${styles.whatsappIcon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FAIcon icon={faWhatsapp} size="lg" />
              </a>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                  style={{ cursor: "pointer" }}
                >
                  <FAIcon icon={faUser} className="me-1" />
                  {getUserDisplay()}
                </a>
                <ul 
                  className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                  style={{
                    display: dropdownOpen ? "block" : "none",
                    position: "absolute",
                    right: 0
                  }}
                >
                  <li>
                    <Link href="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <FAIcon icon={faUser} className="me-1" />
                      My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={handleLogoutClick}
                      style={{ cursor: "pointer" }}
                    >
                      <FAIcon icon={faSignOutAlt} className="me-1" />
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/register" className={`nav-link ${styles.navLink} ${styles.authLink}`}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className={`nav-link ${styles.navLink} ${styles.authLink}`}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;