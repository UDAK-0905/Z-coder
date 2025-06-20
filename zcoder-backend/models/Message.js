const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  roomId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content:   { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
