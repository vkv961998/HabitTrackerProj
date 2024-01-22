// const dotenv = require("dotenv");
// dotenv.config();
console.log("DB");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/HabitTracker");
// const connectMongoose = mongoose.connection;
// connectMongoose.on("error", console.error.bind(console, "connectionError"));
// connectMongoose.once("open", () => {
//   console.log("Server is connected to database");
// });
exports.connectMongoose = () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connectionError"));
  db.once("open", () => {
    console.log("Server is connected to database");
  });
};
