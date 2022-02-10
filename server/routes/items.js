const express = require("express")
const router = express.Router()
const Item = require("../models/item")

// ITEM ROUTES
router.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

router.post("/items", async (req, res) => {
  const item = new Item(req.body.item);
  await item.save();
  res.json(item);
});

router.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.json(item);
});

router.put("/items/:id", async (req, res) => {
  console.log(req.params);
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

module.exports = router