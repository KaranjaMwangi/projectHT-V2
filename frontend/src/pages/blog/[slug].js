import React from 'react';
import Head from 'next/head';

export default function BlogPost({ blog }) {
  return (
    <div className="container py-5">
      <Head>
        <title>{blog.seoTitle || blog.title}</title>
        <meta name="description" content={blog.seoDescription} />
        <meta name="keywords" content={blog.seoKeywords.join(', ')} />
      </Head>

      <article className="blog-post">
        {blog.featuredImage && (
          <img 
            src={blog.featuredImage} 
            className="img-fluid rounded mb-4" 
            alt={blog.title}
          />
        )}
        <h1 className="mb-4">{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`);
  const blog = await res.json();
  return { props: { blog } };
}