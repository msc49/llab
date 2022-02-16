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
// 1. user requests item (message, intended return date) and is added to the request queue
// message appears in notifications//on hold//
// 2. lender reviews requests and approves one >> (sets approved to true on req), set requester as borrower,
// message appears in notifications //on hold//

//3.  borrower is added to item / 

// 4. borrower returns item (button) >> return request

// 5. lender confirms return, button >> delete request, delete borrow from it, delete return request

//  (borrower and can now approve other items -- don't care


