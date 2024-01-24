console.log("DB");
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.1:27017/HabitTracker");

exports.connectMongoose = () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connectionError"));
  db.once("open", () => {
    console.log("Server is connected to database");
  });
};
