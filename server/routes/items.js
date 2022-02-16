const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// ITEM ROUTES
// ALL ITEMS LIST
router.get("/items", async (req, res) => {
  const items = await Item.find({}).populate("borrower").populate("lender");
  res.json(items);
});

// CREATE A NEW ITEM
router.post("/items", async (req, res) => {
  const item = new Item(req.body.item);
  await item.save();
  await item.populate("lender");
  res.json(item);
});

// SPECIFIC ITEM
router.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.json(item);
});

// SEARCH ITEMS
router.get("/items/search/:query", async (req, res) => {
  const { query } = req.params;
  console.log('hit search with: ', query)
  console.log('querying mongo')
  const items = await Item.find({name: new RegExp('.*' + query + '.*', "i")})
  console.log(items)
  res.json(items);
});

// EDIT ITEM
router.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(
    id,
    { ...req.body.item },
    { new: true }
  );
  res.json(item);
});

// DELETE ITEM
router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id, { new: true });
  res.json(item);
});

// BORROW ITEM
router.put("/items/:id/borrow/:userId", async (req, res) => {
  const { id, userId } = req.params;
  const item = await Item.findByIdAndUpdate(
    id,
    { borrower: userId },
    { new: true }
  );
  res.json(item);
});

// REQUEST ITEM
router.post("/items/requests", async (req, res) => {
  const { itemId, borrowerId, requestMessage, date } = req.body.request;
  const item = await Item.findById(itemId);

  item.requests.push({
    requester: borrowerId,
    message: requestMessage,
    return: date,
  });

  await item.save();
  res.json(item);
});

// UPLOAD ITEM IMAGE
// USE MULTER
const uploadMulter = require("../middleware/images/upload.js");
const validation = require("../middleware/images/validation.js");

router.post("/items/:id/images", uploadMulter, validation, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  item.images.push({
    path: req.file.path,
  });

  await item.save();
  res.json(item);
});

module.exports = router;
