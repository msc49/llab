const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 80,
      default: "",
    },
    username: {
      type: String,
      required: true,
      maxLength: 80,
      default: "",
    },
    email: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/,
      unique: true,
      lowercase: true,
      maxLength: 320,
    },
    location: {
      type: String,
      default: 'London'
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
