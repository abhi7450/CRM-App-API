const mongoose = require("mongoose");
const dbConfig = require("../configs/db.config");

async function connectToDb() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbConfig.uri, () => {
      console.log("Connected to DB :)");
    });
  } catch (err) {
    console.log("Error while connecting the DB...", err.message);
  }
}

module.exports = { connectToDb };
