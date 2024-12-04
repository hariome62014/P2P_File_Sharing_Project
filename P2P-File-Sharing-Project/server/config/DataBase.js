require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DATABASE CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log("DATABASE CONNECTION ERROR");
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
