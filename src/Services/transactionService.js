const Transaction = require("../Models/Transaction");
const axios = require("axios");

const recordTransaction = async (amount, currency) => {
  try {
    const conversionRate = await getConversionRate(currency);
    const convertedAmount = amount * conversionRate;
    const transaction = new Transaction({
      amount: convertedAmount,
      currency,
    });
    await transaction.save();
    return { success: true, message: "Transaction recorded successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal server error" };
  }
};
const getDailyReports = async () => {
  try {
    const transactions = await Transaction.find({}).sort({ date: "desc" });

    // Group transactions by date
    const groupedTransactions = groupTransactionsByDate(transactions);

    return { success: true, dailyReports: groupedTransactions };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal Server Error" };
  }
};
// Helper function to call the currency conversion API
const getConversionRate = async (currency) => {
  try {
    const response = await axios.get("https://api.fxratesapi.com/latest");
    return response.data.rates[currency];
  } catch (error) {
    console.error("Error fetching conversion rate:", error.message);
    throw error; // Re-throw the error to propagate it to the calling function
  }
};

// Helper function to group transactions by date
const groupTransactionsByDate = (transactions) => {
  const groupedTransactions = {};

  transactions.forEach((transaction) => {
    const dateKey = transaction.date.toISOString().split("T")[0];
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }

    groupedTransactions[dateKey].push({
      amount: transaction.amount,
      currency: transaction.currency,
    });
  });

  return groupedTransactions;
};
module.exports = {
  recordTransaction,
  getDailyReports,
};
