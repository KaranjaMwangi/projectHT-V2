import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/styles.module.css';


export default function Blog({ blogs = [] }) {
  return (
    <div >
    <Navbar />
    <div className="container py-5">
        
      <Head>
        <title>CBC Resources Blog | Home Teacher</title>
        <meta name="description" content="Free CBC learning materials, exams, and teacher resources for Kenya" />
        <meta name="keywords" content="CBC Kenya, CBC learning materials, Grade 5-8 CBC notes, Secondary school CBC curriculum" />
      </Head>
      
      <h1 className="text-center mb-5">Latest CBC Resources</h1>
      
      {blogs.length === 0 ? (
        <div className="alert alert-info text-center">
          No blog posts found. Please check back later.
        </div>
      ) : (
        <div className="row">
          {blogs.map(blog => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {blog.featuredImage && (
                  <img 
                    src={blog.featuredImage} 
                    className="card-img-top" 
                    alt={blog.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text flex-grow-1">{blog.summary}</p>
                  <Link href={`/blog/${blog.slug}`} passHref legacyBehavior>
                    <a className="btn btn-primary align-self-start">Read More</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>

<Footer />
 </div>
  );
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/blogs`);
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const blogs = await res.json();
    return { 
      props: { 
        blogs: Array.isArray(blogs) ? blogs : [] 
      } 
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { 
      props: { 
        blogs: [] 
      } 
    };
  }
}