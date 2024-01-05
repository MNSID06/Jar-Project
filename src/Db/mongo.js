const mongoose = require("mongoose");
const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "kirana-store";
MongoClient.connect(
  connectionURL,

  (error, client) => {
    if (error) {
      return console.log("unable to connect");
    }
    const db = client.db(databaseName);

    mongoose.connect("mongodb://127.0.0.1:27017/kirana-store", {
      useNewUrlParser: true,
    });
  }
);
