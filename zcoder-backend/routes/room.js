const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create room
router.post('/', async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.status(201).json(room);
});

// Join room (add member)
router.post('/join/:roomId', async (req, res) => {
  const { userId } = req.body;
  const room = await Room.findById(req.params.roomId);
  if (!room.members.includes(userId)) {
    room.members.push(userId);
    await room.save();
  }
  res.json(room);
});

// Get room
router.get('/:id', async (req, res) => {
  const room = await Room.findById(req.params.id).populate('members');
  res.json(room);
});

module.exports = router;

// Get latest code for a room
router.get('/code/:roomId', async (req, res) => {
  const room = await Room.findOne({ roomId: req.params.roomId });
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json({ code: room.roomCode });
});

// Save code to a room
router.post('/code/:roomId', async (req, res) => {
  const { code } = req.body;
  const room = await Room.findOneAndUpdate(
    { roomId: req.params.roomId },
    { roomCode: code },
    { new: true, upsert: true }
  );
  res.json({ message: 'Code saved' });
});
