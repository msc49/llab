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
    required: true,
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
      }, 
      message: {
        type: String,
      },
      return: {
        type: Date,
      },
    }
  ],
  return_request: {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    }
  }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;

// pseudo code
// -----------
// user requests item (message, intended return date) and is added to the request queue
// message appears in notifications
// lender reviews requests and approves one 
// message appears in notifications
// borrower is added to item / + their message & intended return date
// borrower returns item
// lender confirms, (borrower and can now approve other items


