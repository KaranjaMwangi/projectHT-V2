import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Downloads() {
  const grades = [
    { id: 1, name: "PP1" },
    { id: 2, name: "PP2" },
    { id: 3, name: "G1" },
    { id: 4, name: "G2" },
    { id: 5, name: "G3" },
    { id: 6, name: "G4" },
    { id: 7, name: "G5" },
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
      
      {/* Grade Cards Section */}
      <section className={`py-5 ${styles.downloadsSection}`}>
        <div className="container">
          <h2 className="text-center mb-4">Select Your Grade</h2>
          <div className="row">
            {grades.map((grade) => (
              <div key={grade.id} className="col-md-4 col-lg-3 mb-4">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{grade.name}</h5>
                    <p className="card-text flex-grow-1">Download resources for {grade.name}.</p>
                    <Link 
                      href={`/downloads/${grade.name.toLowerCase()}`} 
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
}