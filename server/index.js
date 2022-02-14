if (process.env.NODE_ENV !== "prod") require("dotenv").config()

// IMPORT DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser")
const multer = require("multer");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require('connect-mongo')

// IMPORT ROUTES
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

// IMPORT MODELS
const Item = require("./models/item.js");
const User = require("./models/user.js");
const { json } = require("body-parser");

// RUN EXPRESS/MONGO/MONGOOSE
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

// const sessionConfig = {
//   secret: "thisshouldbeabettersecret!",
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore,
//   cookie: {
//     httpOnly: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };

// RUN MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(session(sessionConfig));
app.use(passport.initialize());
// app.use(passport.session());

app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HOME ROUTE
app.use("/", itemRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  // if(req.session.viewCount) {
  //   req.session.viewCount++
  // } else {
  //   req.session.viewCount = 1
  // }
  // console.log(req.session)
  res.send("home");
});



// OPEN EXPRESS ON PORT 4000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

