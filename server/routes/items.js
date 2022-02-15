const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// ITEM ROUTES

router.get("/items", async (req, res) => {
  const items = await Item.find({}).populate("borrower").populate("lender");
  res.json(items);
});

router.post("/items", async (req, res) => {
  const item = new Item(req.body.item);
  await item.save();
  await item.populate("lender");
  res.json(item);
});

router.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.json(item);
});

router.get("/items/search/:query", async (req, res) => {
  console.log('hit backend')
  const { query } = req.params;
  const items = await Item.find({name: new RegExp('.*' + query + '.*', "i")})
  res.json(items);
});

router.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(
    id,
    { ...req.body.item },
    { new: true }
  );
  res.json(item);
});

router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id, { new: true });
  res.json(item);
});

router.put("/items/:id/borrow/:userId", async (req, res) => {
  const { id, userId } = req.params;
  const item = await Item.findByIdAndUpdate(
    id,
    { borrower: userId },
    { new: true }
  );
  res.json(item);
});

// Use multer middleware
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
