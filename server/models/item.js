const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 80,
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
  },
  // lender: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // borrower: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
