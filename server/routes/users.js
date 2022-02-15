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


// Use multer middleware
const uploadMulter = require('../middleware/images/uploadUserImage.js')
const validation = require('../middleware/images/validation.js');

router.put('/users/:id/images', uploadMulter, validation, async (req, res) => {
  console.log('in the route')
  const { id } = req.params;
  const user = await User.findById(id)

  console.log(req.file)
  
  user.images.push({
    path: req.file.path
  })
  
  await user.save()

  res.json(user)

})


module.exports = router;
