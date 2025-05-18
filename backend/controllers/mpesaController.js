const { stkPush } = require("../services/mpesaService");

// @desc    Initiate MPESA STK Push
// @route   POST /api/mpesa/stkpush
// @access  Public
const initiateStkPush = async (req, res) => {
  const { phone, amount, accountReference, transactionDesc } = req.body;

  try {
    const result = await stkPush({
      phone,
      amount,
      accountReference,
      transactionDesc,
      callbackUrl: `${process.env.MPESA_CALLBACK_URL}`,
    });

    res.status(200).json({
      message: "STK Push initiated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    MPESA Callback Handler
// @route   POST /api/mpesa/callback
// @access  Public
const handleCallback = async (req, res) => {
  try {
    console.log("MPESA Callback Data:", req.body);

    // Process the callback data as needed
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Error handling MPESA callback:", error.message);
    res.status(500).json({ message: "Failed to handle callback" });
  }
};

module.exports = { initiateStkPush, handleCallback };