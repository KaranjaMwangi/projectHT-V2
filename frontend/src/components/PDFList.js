import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PDFList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const { data } = await axios.get('/api/admin/pdfs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for admin auth
          },
        });
        setPdfs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
        setLoading(false);
      }
    };
    fetchPDFs();
  }, []);

  const deletePDF = async (id) => {
    try {
      await axios.delete(`/api/admin/pdfs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPdfs(pdfs.filter((pdf) => pdf._id !== id));
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  if (loading) {
    return <p className="loading">Loading PDFs...</p>;
  }

  return (
    <div>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf._id}>
            <a href={`/${pdf.path}`} target="_blank" rel="noopener noreferrer">
              {pdf.name}
            </a>
            <button onClick={() => deletePDF(pdf._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PDFList;