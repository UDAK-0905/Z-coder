const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  members:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  code:       { type: String, default: '' }, // shared editor content
  roomId: { type: String, required: true, unique: true },
  users: [String],
  roomCode: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);

