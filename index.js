// require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/routes");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const { connectMongoose } = require("./app/db");
connectMongoose();
app.use("/assets", express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at port: 8000`);
});
