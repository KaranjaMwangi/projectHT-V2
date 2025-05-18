import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import PDFList from "../components/PDFList";
import PDFUploadForm from "../components/PDFUploadForm";
import styles from "../styles/AdminDashboard.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PDFManagement = () => {
  return (
    <div className={`${styles.adminDashboard} container-fluid`}>
      <Navbar />
      <main className="container py-4">
        <h1 className="mb-4 text-center">PDF Management</h1>
        
        <div className={`${styles.dashboardSection} card shadow-sm mb-4`}>
          <div className="card-body">
            <h2 className="card-title mb-3">Uploaded PDFs</h2>
            <PDFList />
          </div>
        </div>

        <div className={`${styles.dashboardSection} card shadow-sm`}>
          <div className="card-body">
            <h2 className="card-title mb-3">Upload or Replace PDF</h2>
            <PDFUploadForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const PDFManagementPage = () => {
  return (
    <ProtectedRoute isAdmin={true}>
      <PDFManagement />
    </ProtectedRoute>
  );
};

export default PDFManagementPage;