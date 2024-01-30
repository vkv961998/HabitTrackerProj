console.log("DB");
const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/HabitTracker");

exports.connectMongoose = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://keertivardhanvadrevu:vkv961998@cluster0.za2vcna.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((e) => console.log("Connected to Mongodb => Habit-Tracker"))
    .catch((e) => console.log("Mongodb is not been connected", e));
};
