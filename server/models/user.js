const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
  name: {
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
  // authStrategy: {
  //   type: String,
  //   default: "local",
  // },
  // refreshToken: {
  //   type: [Session],
  // },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

// //Remove refreshToken from the response
// UserSchema.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.refreshToken
//     return ret
//   },
// })

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema);
module.exports = User;
