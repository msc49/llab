let mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const User = require("../models/user")

const { registerUser } = require('../controllers/userControllers')
router.route("/").post(registerUser)

// USER ROUTES
router.post("/users", async (req, res) => {
  console.log(req.body)
  const { name, email, username, password } = req.body.user
  const user = new User({name, email, username})
  const registeredUser = await User.register(user, password)
  res.send(registeredUser)
});


module.exports = router
