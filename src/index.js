const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const transactionRoutes = require("./Routes/transactionRoutes");

const app = express();
require("./Db/mongo");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
