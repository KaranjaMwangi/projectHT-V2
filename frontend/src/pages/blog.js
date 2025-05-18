import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/styles.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blog() {
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
      <Navbar />

      {/* Blog Posts Section */}
      <section className={`py-5 ${styles.blogSection}`}>
        <div className="container">
          <h2 className="text-center mb-4">Latest Blog Posts</h2>
          <div className="row">
            {blogPosts.map((post) => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text flex-grow-1">{post.summary}</p>
                    <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                      <a className="btn btn-primary align-self-start">Read More</a>
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