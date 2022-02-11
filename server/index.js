if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}





// require express, path, mongoose, method-oveerride
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser")
const passport = require("passport");
const LocalStrategy = require("passport-local");

// // unneeded? --
// const methodOverride = require("method-override");
// // ------------

// if (process.env.NODE_ENV !== "production") {
//   // Load environment variables from .env file in non-prod environments
//   require("dotenv").config()
// }

// require("./strategies/JwtStrategy")
// require("./strategies/LocalStrategy")
// require("./authenticate")

// ROUTES
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

// import models
const Item = require("./models/item.js");
const User = require("./models/user.js");

// run express, connect mongoose to mongodb
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/llab", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Connection Open!"))
  .catch((e) => console.log("Oh no mongo error!!", e));

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

// // configure express to find views directory, use EJS
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// configure express to use method-override, receive form data, receive json, morgan
// app.use(methodOverride("_method"));
// app.use(bodyParser.json())
// app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(express.urlencoded({ extended: true }));
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

// // import category route??
// app.use('/api', require('./routes/category.route.js'))
// // Page note found 404
// app.use((req, res) => {
//   res.status(404).json({
//     errors: "page not found"
//   })
// })

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Example Routes
app.get("/", (req, res) => {
  res.send("home");
});

app.get("/fakeUser", async (req, res) => {
  const user = new User({
    name: "MyName",
    email: "coltttt@gmail.com",
    username: "collllt",
  });
  const newUser = await User.register(user, "chicken");
  res.send(newUser);
});

// SESSION ROUTES
app.post("/sessions", async (req, res) => {
  const session = "return userid and session key";
  res.json(session);
});

// set express to listen on port 4000
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
