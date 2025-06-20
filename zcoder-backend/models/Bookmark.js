const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem:  { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  tags:     [String]
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
