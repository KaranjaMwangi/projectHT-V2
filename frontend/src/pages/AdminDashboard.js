import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import UserList from "../components/UserList";
import TransactionList from "../components/TransactionList";
import "../styles/AdminDashboard.module.css"; // Import the CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />
      <main className="container">  {/* Added container for better layout */}
        <h1 className="my-4">Admin Dashboard</h1>  {/* Added margin */}
        <div className="dashboard-section mb-4">  {/* Added margin */}
          <h2>Manage Users</h2>
          <UserList />
        </div>
        <div className="dashboard-section mb-4">  {/* Added margin */}
          <h2>Transactions</h2>
          <TransactionList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Wrap the AdminDashboard with ProtectedRoute
const AdminDashboardPage = () => {
  return (
    <ProtectedRoute isAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;