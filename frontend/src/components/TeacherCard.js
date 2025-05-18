import React, { useState } from "react";
import styles from "../styles/styles.module.css";

export default function TeacherCard({ teacher }) {
  const [rating, setRating] = useState(0); // State for the teacher's rating

  const handleRatingClick = (index) => {
    setRating(index + 1); // Update the rating when a star is clicked
  };

  return (
    <div className={`card shadow-sm ${styles.teacherCard}`}>
      <div className="card-body">
        <h5 className={`card-title ${styles.cardTitle}`}>{teacher.username}</h5>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Location:</strong> {teacher.location}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Availability:</strong> {teacher.availability}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Gender:</strong> {teacher.gender}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Rate of Pay:</strong> {teacher.rateOfPay}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Subjects:</strong> {teacher.subjects.join(", ")}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Grades:</strong> {teacher.grades.join(", ")}
        </p>
        <p className={`card-text ${styles.cardText}`}>
          <strong>Verified:</strong>{" "}
          {teacher.verified ? "Yes" : "Pending Admin Verification"}
        </p>
        <div className={styles.ratingContainer}>
          <p className={`card-text ${styles.cardText}`}>
            <strong>Rating:</strong>
          </p>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`${styles.star} ${
                  index < rating ? styles.filledStar : ""
                }`}
                onClick={() => handleRatingClick(index)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}