import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import TeacherCard from "../components/TeacherCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TeachersPage() {
  const router = useRouter();

  const [teachers, setTeachers] = React.useState([
    {
      id: 1,
      username: "John Doe",
      profilePicture: "/images/teacher1.jpg",
      location: "Nairobi",
      availability: "Weekends",
      gender: "Male",
      rateOfPay: "Negotiable",
      subjects: ["Mathematics", "Physics"],
      grades: ["G7", "G8", "G9"],
      verified: true,
      learnersInterested: [
        { phone: "2547****2580", rating: 4, comment: "Great teacher!" },
      ],
    },
  ]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Teacher Advert Section */}
      <section className={`py-4 bg-light ${styles.teacherAdvert}`}>
        <div className="container text-center">
          <h2 className="mb-3">Why Register as a Teacher?</h2>
          <p className="lead">
            Join our platform to connect with students for tuition opportunities
            in your area or online. Your profile becomes visible after verification.
            Professionalism and child safety are our top priorities.
          </p>
          <Link href="/teacher-registration" passHref legacyBehavior>
            <a className="btn btn-primary btn-lg">
              Register as Teacher
            </a>
          </Link>
        </div>
      </section>

      {/* Teacher Cards */}
      <section className="py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Verified Teachers</h2>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="filterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter Teachers
              </button>
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                <li><a className="dropdown-item" href="#">By Subject</a></li>
                <li><a className="dropdown-item" href="#">By Location</a></li>
                <li><a className="dropdown-item" href="#">By Availability</a></li>
              </ul>
            </div>
          </div>
          
          <div className="row g-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="col-md-6 col-lg-4">
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>
          
          {teachers.length === 0 && (
            <div className="text-center py-5">
              <h4>No teachers available yet</h4>
              <p>Check back later or register as a teacher</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}