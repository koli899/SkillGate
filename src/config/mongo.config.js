const mongoose = require("mongoose");
const dotenv = require('dotenv');

async function connectToMongoDB() {
   
  try {
     await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }


}

module.exports = connectToMongoDB;