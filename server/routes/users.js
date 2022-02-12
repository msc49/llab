const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passportMiddleWare = require("../middleware/passport_jwt/jwt");

// USER ROUTES
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

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const { token, expiresIn } = passportMiddleWare.issueJWT(req.user);
  const { _id: id, name, location, username } = req.user;
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
    },
  };
  res.json(userAuthPacket);
});

router.post("/profile", async (req, res) => {
  console.log("hi")
  const user = await User.findOne({ email });
  ;
  res.json(user);
 
});



module.exports = router;
