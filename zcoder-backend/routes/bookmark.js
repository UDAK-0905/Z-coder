const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// Save a bookmark
router.post('/', async (req, res) => {
  try {
    const bookmark = new Bookmark(req.body);
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookmarks for a user
router.get('/:userId', async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.params.userId }).populate('problem');
  res.json(bookmarks);
});

module.exports = router;
