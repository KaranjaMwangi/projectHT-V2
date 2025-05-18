import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/styles.module.css";

const Grades = () => {
  const grades = [
    { id: 8, name: "G6" },
    { id: 9, name: "G7" },
    { id: 10, name: "G8" },
    { id: 11, name: "G9" },
    { id: 12, name: "G10" },
    { id: 13, name: "F2" },
    { id: 14, name: "F3" },
    { id: 15, name: "F4" },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Grade Sections */}
      <section className={`py-5 bg-light ${styles.gradesSection}`}>
        <div className="container">
          <h2 className="text-center mb-4">Select Your Grade</h2>
          <div className="row">
            {grades.map((grade) => (
              <div key={grade.id} className="col-md-4 col-lg-3 mb-4">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{grade.name}</h5>
                    <p className="card-text flex-grow-1">
                      Access daily questions and downloadable content for {grade.name}.
                    </p>
                    <Link 
                      href={`/grades/${grade.name.toLowerCase()}`}
                      passHref
                      legacyBehavior
                    >
                      <a className="btn btn-primary mt-auto">View Content</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Grades;