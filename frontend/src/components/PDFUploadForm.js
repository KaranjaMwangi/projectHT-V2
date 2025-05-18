import React, { useState } from "react";
import axios from "axios";

const PDFUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF to upload.");
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setUploading(true);
      await axios.post("/api/admin/pdfs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("PDF uploaded successfully!");
      setFile(null);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <label>
        Select PDF:
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </label>
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default PDFUploadForm;