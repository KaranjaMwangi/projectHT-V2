import React from 'react';
import Link from 'next/link';
import styles from "../styles/footer.module.css";
import FAIcon from './FAIcon'; // This is your client-safe FontAwesome wrapper

import {
  faPhone,
  faEnvelope,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

import {
  faWhatsapp,
  faYoutube,
  faFacebookF
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Contact Information */}
        <div className={styles.contactSection}>
          <div className={styles.contactItem}>
            <FAIcon icon={faPhone} className={styles.contactIcon} />
            <a href="tel:+254757325802" className={styles.contactLink}>
              +254 757 325 802
            </a>
          </div>

          <div className={styles.contactItem}>
            <FAIcon icon={faEnvelope} className={styles.contactIcon} />
            <a href="mailto:kenkaranjamwangi@gmail.com" className={styles.contactLink}>
              kenkaranjamwangi@gmail.com
            </a>
          </div>

          <div className={styles.contactItem}>
            <FAIcon icon={faMoneyBillWave} className={styles.contactIcon} />
            <span className={styles.contactText}>M-Pesa Till: 222222</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={styles.socialSection}>
          <a
            href="https://www.youtube.com/@teacherken1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FAIcon
              icon={faYoutube}
              className={styles.socialIcon}
              style={{ color: '#FF0000' }}
            />
          </a>

          <a
            href="https://web.facebook.com/?_rdc=1&_rdr#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FAIcon
              icon={faFacebookF}
              className={styles.socialIcon}
              style={{ color: '#1877F2' }}
            />
          </a>

          <a
            href="https://wa.me/254757325802"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FAIcon
              icon={faWhatsapp}
              className={styles.socialIcon}
              style={{ color: '#25D366' }}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Home Teacher. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
