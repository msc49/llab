const mongoose = require("mongoose");
const { Schema } = mongoose;

// checkout mongoose unique validator
// JWT
// add proxy to localhost<express>fromReact

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 80,
  },
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/,
    unique: true,
    lowercase: true,
    maxLength: 320,
  },
  password: {
    type: String,
    required: true,
    maxLength: 60,
  },
  Location: String,
  lender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
