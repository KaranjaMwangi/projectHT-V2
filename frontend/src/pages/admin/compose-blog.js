import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = dynamic(
  () => import('react-quill'),
  { 
    ssr: false,
    loading: () => <div className="p-3 bg-light">Loading editor...</div>
  }
);

export default function ComposeBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    featuredImage: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to create blog posts');
      router.push('/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Quill editor configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.summary || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Your session has expired. Please login again.');
      }

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: 'POST',
        body: form,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to publish blog');
      }

      alert('Blog published successfully!');
      // Reset form after successful submission
      setFormData({
        title: '',
        summary: '',
        content: '',
        seoTitle: '',
        seoDescription: '',
        featuredImage: null
      });
      router.push('/blog');
    } catch (error) {
      console.error('Publishing error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Compose New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title*</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Featured Image</label>
          <input
            type="file"
            className="form-control"
            name="featuredImage"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Summary*</label>
          <textarea
            className="form-control"
            rows="3"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content*</label>
          <RichTextEditor
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="bg-white"
            style={{ height: '300px', marginBottom: '20px' }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">SEO Title</label>
          <input
            type="text"
            className="form-control"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">SEO Description</label>
          <textarea
            className="form-control"
            rows="2"
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleInputChange}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Publishing...
            </>
          ) : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
}






// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const RichTextEditor = dynamic(
//   () => import('react-quill'),
//   { 
//     ssr: false,
//     loading: () => <p>Loading editor...</p>
//   }
// );

// export default function ComposeBlog() {
//   const [formData, setFormData] = useState({
//     title: '',
//     summary: '',
//     content: '',
//     seoTitle: '',
//     seoDescription: '',
//     featuredImage: null
//   });

//   // Quill editor modules configuration
//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'link', 'image'
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       featuredImage: e.target.files[0]
//     }));
//   };

//   const handleContentChange = (content) => {
//     setFormData(prev => ({
//       ...prev,
//       content
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const form = new FormData();
//       for (const key in formData) {
//         if (formData[key] !== null && formData[key] !== undefined) {
//           form.append(key, formData[key]);
//         }
//       }

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const res = await fetch(`${apiUrl}/api/blogs`, {
//         method: 'POST',
//         body: form,
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Failed to publish blog');
//       }

//       const result = await res.json();
//       alert('Blog published successfully!');
//       // Reset form after successful submission
//       setFormData({
//         title: '',
//         summary: '',
//         content: '',
//         seoTitle: '',
//         seoDescription: '',
//         featuredImage: null
//       });
//     } catch (error) {
//       console.error('Error publishing blog:', error);
//       alert(`Publishing failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h1 className="mb-4">Compose New Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title*</label>
//           <input
//             type="text"
//             className="form-control"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Featured Image</label>
//           <input
//             type="file"
//             className="form-control"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Summary*</label>
//           <textarea
//             className="form-control"
//             rows="3"
//             name="summary"
//             value={formData.summary}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Content*</label>
//           <RichTextEditor
//             theme="snow"
//             value={formData.content}
//             onChange={handleContentChange}
//             modules={modules}
//             formats={formats}
//             className="bg-white"
//             style={{ height: '300px' }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">SEO Title</label>
//           <input
//             type="text"
//             className="form-control"
//             name="seoTitle"
//             value={formData.seoTitle}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="form-label">SEO Description</label>
//           <textarea
//             className="form-control"
//             rows="2"
//             name="seoDescription"
//             value={formData.seoDescription}
//             onChange={handleInputChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Publish Blog
//         </button>
//       </form>
//     </div>
//   );
// }