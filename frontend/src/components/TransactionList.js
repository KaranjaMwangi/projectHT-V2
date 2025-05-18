import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.module.css"; // Import the CSS file

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get("/api/admin/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for admin auth
          },
        });
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="loading">Loading transactions...</p>;
  }

  return (
    <div>
      <h3>Transaction List</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.user.name}</td>
              <td>{transaction.phone}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;