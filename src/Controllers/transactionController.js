const transactionService = require("../Services/transactionService");
const axios = require("axios");

const recordTransaction = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Call the currency conversion API
    const result = await transactionService.recordTransaction(amount, currency);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const getDailyReports = async (req, res) => {
  const result = await transactionService.getDailyReports();
  if (result.success) {
    res.json({ dailyReports: result.dailyReports });
  } else {
    res.status(500).json({ error: result.error });
  }
};
module.exports = {
  recordTransaction,
  getDailyReports,
};
