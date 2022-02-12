
const asyncHandler = require('express-async-handler')
const User = require('../models/user')


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
         location:user.location
       });
     } else {
       res.status(400)
       throw new Error('Error occured')
     }
});

module.exports = { registerUser }

