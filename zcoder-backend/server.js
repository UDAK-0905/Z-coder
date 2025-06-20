mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB ✅'))
.catch((err) => console.error('MongoDB connection error:', err));


const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => res.send('ZCoder API is running'));

// WebSocket logic
io.on('connection', socket => {
  console.log('User connected: ', socket.id);
  
  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle code changes
  socket.on('code-change', ({ roomId, code }) => {
    socket.to(roomId).emit('code-update', code); // broadcast to others in room
  });

  // Handle chat messages (optional)
  socket.on('chat-message', ({ roomId, message }) => {
    socket.to(roomId).emit('receive-message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require('./routes/user');
const problemRoutes = require('./routes/problem');
const bookmarkRoutes = require('./routes/bookmark');
const roomRoutes = require('./routes/room');

app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/rooms', roomRoutes);
