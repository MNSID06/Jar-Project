const express = require("express");
const router = express.Router();

router.post("/record", (req, res) => {
  const transactionController = require("../Controllers/transactionController");
  transactionController.recordTransaction(req, res);
});
router.get("/daily-reports", (req, res) => {
  const transactionController = require("../Controllers/transactionController");
  transactionController.getDailyReports(req, res);
});

module.exports = router;
