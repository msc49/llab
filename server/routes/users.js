const express = require("express")
const router = express.Router()
const User = require("../models/user")

// USER ROUTES
router.post("/users", async (req, res) => {
  const { name, email, username, password } = req.body
  const user = new User({name, email, username})
  const registeredUser = await User.register(user, password)
  res.send(registeredUser)
});


// const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")

// router.post("/signup", async (req, res, next) => {
//   // Verify that name is not empty
//   if (!req.body.name) {
//     res.statusCode = 500
//     res.send({
//       name: "NameError",
//       message: "The name is required",
//     })
//   } else {
//     console.log('about to register')
//     console.log(req.body)
//     User.register(
    
//       new User({ email: req.body.email }),
//       req.body.password,
//       (err, user) => {
//         if (err) {
//           console.log('EROOOOOORRRR')
//           console.log(err)
//           res.statusCode = 500
//           res.send(err)
//         } else {
//           user.name = req.body.name
//           user.location = req.body.location || ""
//           const token = getToken({ _id: user._id })
//           const refreshToken = getRefreshToken({ _id: user._id })
//           user.refreshToken.push({ refreshToken })
//           user.save((err, user) => {
//             if (err) {
//               res.statusCode = 500
//               res.send(err)
//             } else {
//               res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
//               res.send({ success: true, token })
//             }
//           })
//         }
//       }
//     )
//   }
// })

module.exports = router
