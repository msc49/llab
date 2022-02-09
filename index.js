// require express, path, mongoose, method-oveerride
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

// import models
const Item = require('./models/item.js')
const User = require('./models/user.js')

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

// configure express to use method-override, receive form data, receive json, morgan
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("home");
});

// ITEM ROUTES
app.get('/items', async (req, res) => {
  const items = await Item.find({});
  res.json(items)
})

app.post('/items', async (req, res) => {
  const item = new Item(req.body.item)
  await item.save();
  res.json(item)
})

app.get('/items/:id', async (req, res) => {
  const { id } = req.params
  const item = await Item.findById(id);
  res.json(item)
})

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, { ...req.body.item }, {new: true});
  res.json(item)
});

app.delete('/items/:id', async(req, res) => {
  const { id } = req.params
  const item = await Item.findByIdAndDelete(id, {new: true})
  res.json(item)
})

// USER ROUTES
app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id);
  res.json(user)
})

app.post('/users', async (req, res) => {
  const user = new User(req.body.user)
  await user.save();
  res.json(user)
})

app.delete('/users/:id', async(req, res) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id, {new: true})
  res.json(user)
})

// SESSION ROUTES

app.post('/sessions', async(req, res) => {
  const session = 'return userid and session key'
  res.json(session)
})

// set express to listen on port 4000
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
