
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utilities/generateToken')


const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, location, password} = req.body;
  
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400)
    throw new Error ('User already exists')
    }
    
    const user = await User.create({
      name, 
      email, 
      username,
      location,
      password
    });

     if(user) {
       res.status(201).json({
         _id:user._id,
         name:user.name,
         username:user.username,
         email:user.email,
         location:user.location,
         token:generateToken(user._id)
       });
     } else {
       res.status(400)
       throw new Error('Error occured')
     }
});



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

   if (user && (await user.matchPassword(password))) {
     res.json({
      _id:user._id,
      name:user.name,
      username:user.username,
      email:user.email,
      location:user.location,
      token:generateToken(user._id)

     });
   } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
});


module.exports = { registerUser, authUser }

