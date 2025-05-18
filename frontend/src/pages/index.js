import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "CBC Learning Materials for Grade 5-8",
      summary: "Find comprehensive CBC notes, exams, and revision papers for Grades 5-8.",
      slug: "cbc-learning-materials-grade-5-8",
    },
    {
      id: 2,
      title: "How to Help Your Child with CBC Homework",
      summary: "Discover effective ways to assist your child with CBC homework and assignments.",
      slug: "how-to-help-your-child-with-cbc-homework",
    },
    {
      id: 3,
      title: "Best CBC Learning Websites in Kenya",
      summary: "Explore the best online platforms for CBC digital learning in Kenya.",
      slug: "best-cbc-learning-websites-kenya",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContent}>
        <Navbar />

        {/* Enhanced Hero Section */}
        <section className={`${styles.heroSection}`}>
          <div className="container-fluid px-lg-5">
            <div className={`${styles.heroContent}`}>
              <p className={styles.brandHighlight}>
                <span className={styles.brandName}>Home Teacher</span> is Kenya's 
                <span className={styles.largeCommunity}> Largest Online Learning Community</span>, 
                offering comprehensive CBE materials from PP1 to Grade 10 and Form 2 to Form 4.
              </p>
              <p className={styles.heroText}>
                Access freshly set exams, schemes of work, and all educational resources in one place. 
                Enjoy our always-updated tests in <span className={styles.quizizzHighlight}>Quizizz</span> and <span className={styles.kahootHighlight}>Kahoot</span>.
              </p>
              <p className={styles.callToAction}>
                <span className={styles.brandTagline}>KEEP IT HOME TEACHER</span>
              </p>
            </div>

            <div className={`row g-3 ${styles.platformCards}`}>
              {/* Quizizz Card */}
              <div className="col-lg-4 col-md-6">
                <div className={`card h-100 ${styles.platformCard}`}>
                  <div className="card-body d-flex flex-column">
                    <div className="text-center mb-3">
                      <img 
                        src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/77274c14-f675-484d-b6a0-1763397566f6-v2" 
                        alt="Quizizz Logo" 
                        className={styles.platformLogo}
                      />
                      <h5 className="mt-2">Quizizz Tests</h5>
                    </div>
                    <p className="flex-grow-1">
                      Attempt the current Quizizz meant for your grade and test your skills. 
                      New challenges added weekly.
                    </p>
                    <div className={styles.termInfo}>
                      <strong>Term Dates:</strong> 10/01/2025 to 28/04/2025
                    </div>
                    <div className={styles.priceTag}>
                      Termly Access: <strong>Ksh. 300</strong>
                    </div>
                    <p className="small mt-2">
                    Payment gives you access to all access all Quizzes for the whole term. You'll receive SMS
                      when new quizzes are available.
                    </p>
                    <Link 
                      href="https://youtube.com/@kennedymwangi1" 
                      passHref 
                      legacyBehavior
                    >
                      <a 
                        className="btn btn-primary mt-2 w-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Now
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Kahoot Card */}
              <div className="col-lg-4 col-md-6">
                <div className={`card h-100 ${styles.platformCard}`}>
                  <div className="card-body d-flex flex-column">
                    <div className="text-center mb-3">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZA0s4yAzFlsjqlfbd_DRUPt1SbS3j6xeIw&s" 
                        alt="Kahoot Logo" 
                        className={styles.platformLogo}
                        style={{ borderRadius: '50%' }}
                      />
                      <h5 className="mt-2">Kahoot Challenges</h5>
                    </div>
                    <p className="flex-grow-1">
                      Test your knowledge with our interactive Kahoot challenges
                      for your grade. New challenges added weekly.
                    </p>
                    <div className={styles.termInfo}>
                      <strong>Term Dates:</strong> 10.01.2025 to 28.04.2025
                    </div>
                    <div className={styles.priceTag}>
                      Termly Access: <strong>Ksh. 500</strong>
                    </div>
                    <p className="small mt-2">
                      Payment gives you access to all Kahoot challenges for the term. 
                      You'll receive SMS when new quizzes are available.
                    </p>
                    <Link 
                      href="https://youtube.com/@kennedymwangi1" 
                      passHref 
                      legacyBehavior
                    >
                      <a 
                        className="btn btn-primary mt-2 w-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Now
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Google Classroom Card - UPDATED */}
              <div className="col-lg-4 col-md-6">
                <div className={`card h-100 ${styles.platformCard}`}>
                  <div className="card-body d-flex flex-column">
                    <div className="text-center mb-3">
                      <div className="d-flex justify-content-center align-items-center mb-2" style={{ gap: '10px' }}>
                        <img 
                          src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/77274c14-f675-484d-b6a0-1763397566f6-v2" 
                          alt="Quizizz Logo" 
                          style={{ height: '40px', width: 'auto' }}
                        />
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZA0s4yAzFlsjqlfbd_DRUPt1SbS3j6xeIw&s" 
                          alt="Kahoot Logo" 
                          style={{ height: '40px', width: 'auto', borderRadius: '50%' }}
                        />
                        <img 
                          src="https://3.files.edl.io/7761/23/12/18/190107-9271ed55-e41e-4c34-85dc-ffd1e5bb902e.png" 
                          alt="Google Classroom Logo" 
                          style={{ height: '40px', width: 'auto' }}
                        />
                      </div>
                      <h5 className="mt-1">Quizizz, Kahoot & Google Classrooms</h5>
                    </div>
                    <div className="mt-3 mb-3 p-2 bg-light rounded">
                      <strong>Premium Benefits/Termly:</strong>
                      <ul className="mb-0 ps-3">
                        <li>Full access to Kahoot & Quizizz Tests</li>
                        <li>Google Classroom materials</li>
                        <li>Direct teacher communication</li>
                      </ul>
                    </div>
                    <div className={styles.termInfo}>
                      <strong>Term Dates:</strong> 10.01.2025 to 28.04.2025
                    </div>
                    <div className={styles.priceTag}>
                      Complete Access: <strong>Ksh. 1000</strong>
                    </div>
                  
                    <Link 
                      href="https://youtube.com/@kennedymwangi1" 
                      passHref 
                      legacyBehavior
                    >
                      <a 
                        className="btn btn-primary mt-2 w-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Now
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the code remains exactly the same */}
        {/* Registration Advertisement */}
        <section className={`py-4 ${styles.advertSection}`}>
          <div className="container text-center">
            <h2 className="mb-3">Register for the Next Online Class</h2>
            <p>
              Join our interactive 2-hour online class for only Ksh. 200. Engage
              with expert tutors, ask questions, and get assignments graded!
            </p>
            <Link href="https://wa.me/254757325802" passHref legacyBehavior>
              <a 
                className="btn btn-success btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask Questions on WhatsApp
              </a>
            </Link>
          </div>
        </section>

        {/* Website Features */}
        <section className="py-4 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">What Home Teacher Offers</h2>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Tests and Exams:</strong> Buy, complete, and get them marked by tutors.
              </li>
              <li className="mb-2">
                <strong>Contests:</strong> Compete with learners across Kenya.
              </li>
              <li className="mb-2">
                <strong>Tuition:</strong> Weekend and holiday tutoring, plus evening lessons during school days.
              </li>
              <li className="mb-2">
                <strong>Personal Teachers:</strong> Locate and book tutors near you.
              </li>
            </ul>
            <div className="text-center mt-3">
              <Link href="/register" passHref legacyBehavior>
                <a className="btn btn-primary btn-lg">Sign Up Now</a>
              </Link>
            </div>
          </div>
        </section>

        {/* Subscription Plans + Log Section */}
        <section className="py-4 bg-white">
          <div className="container">
            <div className="row">
              {/* Subscription Plans */}
              <div className="col-md-6 mb-4">
                <h2 className="text-center mb-3">Subscription Plans</h2>
                <div className="card text-center shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Exams</h5>
                    <p className="card-text">Ksh. 30</p>
                    <Link href="/payment/exams" passHref legacyBehavior>
                      <a className="btn btn-primary">Pay Now</a>
                    </Link>
                  </div>
                </div>
                <div className="card text-center shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title">ZIP Files</h5>
                    <p className="card-text">Ksh. 60</p>
                    <Link href="/payment/zip-files" passHref legacyBehavior>
                      <a className="btn btn-primary">Pay Now</a>
                    </Link>
                  </div>
                </div>
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Online Classes</h5>
                    <p className="card-text">Ksh. 200</p>
                    <Link href="/payment/online-classes" passHref legacyBehavior>
                      <a className="btn btn-primary">Pay Now</a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Log Section */}
              <div className="col-md-6">
                <h2 className="text-center mb-3">Check Us Out on YouTube</h2>
                <div className="text-center">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Home Teacher YouTube Video"
                    className="shadow-sm"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="mt-3">
                    <Link href="https://www.youtube.com/@teacherken1" passHref legacyBehavior>
                      <a 
                        className="btn btn-danger"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Our YouTube Channel
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}