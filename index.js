// require express, path, mongoose, method-oveerride
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// run express, connect mongoose to mongodb
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/llab", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Connection Open!"))
  .catch((e) => console.log("Oh no mongo error!!", e));

// configure express to find views directory, use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// configure express to use method-override, receive form data
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("home");
});

// set express to listen on port 4000
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
