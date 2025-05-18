const express = require("express");
const { initiateStkPush, handleCallback } = require("../controllers/mpesaController");

const router = express.Router();

// Routes
router.post("/stkpush", initiateStkPush);
router.post("/callback", handleCallback);

module.exports = router;