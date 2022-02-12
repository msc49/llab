let mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const User = require("../models/user")

const { registerUser, authUser } = require('../controllers/userControllers')

router.route("/").post(registerUser);
router.route("/login").post(authUser)


module.exports = router
