if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// require express, path, mongoose, method-oveerride
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// error handling

const { notFound, errorHandler } = require('./middleware/errorMiddleware')


// ROUTES
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

// import models
const Item = require("./models/item.js");
const User = require("./models/user.js");

// run express, connect mongoose to mongodb
const app = express();

mongoose
  .connect(process.env.NODE_ENV !== 'prod' ? process.env.MONGO_DEV_URI : process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Connection Open!"))
  .catch((e) => console.log("Oh no mongo error!!", e));

//PORT
const PORT = process.env.PORT || 4000;

// set express to listen on port 4000
app.listen(4000, () => {
  console.log("Listening on port 4000");
});

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};


app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", itemRoutes);
app.use("/", userRoutes);
// use uploads folder to save image
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(notFound)
app.use(errorHandler)


// Example Routes
app.get("/", (req, res) => {
  res.send("home");
});


// SESSION ROUTES
app.post("/sessions", async (req, res) => {
  const session = "return userid and session key";
  res.json(session);
});