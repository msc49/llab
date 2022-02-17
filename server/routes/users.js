const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passportMiddleWare = require("../middleware/passport_jwt/jwt");

// CREATE NEW USER
router.post("/users", async (req, res) => {
  const { name, email, username, password, location } = req.body.user;
  const user = new User({ name, email, username });
  await User.register(user, password);
  const newUserPacket = {
    success: true, 
    username, 
    location
  }
  res.json(newUserPacket);
});

// USER LOGIN
router.post("/login", passport.authenticate("local"), async (req, res) => {
  const { token, expiresIn } = passportMiddleWare.issueJWT(req.user);
  const { _id: id, name, location, username, image } = req.user;
  const userAuthPacket = {
    token: {
      token,
      expiresIn,
    },
    user: {
      id,
      name,
      username,
      location,
      image,
    },
  };
  res.json(userAuthPacket);
});

// SET USER IMAGE
const uploadMulter = require('../middleware/images/uploadUserImage.js')
const validation = require('../middleware/images/validation.js');

router.put('/users/:id/images', uploadMulter, validation, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { image: req.file.path }, { new: true })
  
  await user.save()
  res.json(user)
})


module.exports = router;
