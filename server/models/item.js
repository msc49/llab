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
  lender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  available: {
    type: Boolean,
    default: true,
  },
  requests: [
    {
      requester: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, 
      message: {
        type: String,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      return: {
        type: Date,
      },
      return_request: {
        type: Boolean,
        default: false
      },
    }
  ],
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;



