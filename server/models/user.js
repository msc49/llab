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
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
    images: [
    {
      title: {
        type: String,
      },
      path: {
        type: String,
        required: true,
      }
    }
],
});


UserSchema.plugin(passportLocalMongoose)


const User = mongoose.model("User", UserSchema);


module.exports = User;
