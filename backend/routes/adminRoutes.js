const express = require("express");
const { getAllUsers, deleteUser, getAllTransactions } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin Routes
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.get("/transactions", protect, admin, getAllTransactions);

module.exports = router;