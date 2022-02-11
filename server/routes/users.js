let mongoose = require('mongoose')
const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/user")

// USER ROUTES
router.post("/users", async (req, res) => {
  console.log(req.body)
  const { name, email, username, password } = req.body.user
  const user = new User({name, email, username})
  const registeredUser = await User.register(user, password)
  res.send(registeredUser)
});


// console.log('outside strategy')
// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// console.log(opts)
// opts.secretOrKey = 'secret';
// console.log(opts)
// console.log('hell')

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//   console.log('function runnung')
//     User.findOne({password: jwt_payload.sub}, function(err, user) {
//         if (err) {
//           console.log(jwt_payload)
//           console.log('this is an errorr', err)
//           console.log(user)
//             return done(err, false);
//         }
//         if (user) {
//           console.log('user', user)
//             return done(null, user);
//         } else {
//           console.log('no user found')
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));

router.post("/login", async (req, res) => {

  const { password, username } = req.body.login
  console.log('success! you reached sessions')
  console.log(password, username)
})

module.exports = router
