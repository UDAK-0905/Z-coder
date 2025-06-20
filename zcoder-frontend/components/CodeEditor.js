'use client';
import { useEffect, useState } from 'react';
import { fetchRoomCode, saveRoomCode } from '@/lib/api';
import io from 'socket.io-client';
import Editor from '@monaco-editor/react';
import socket from '@/lib/socket';

let socket;

export default function CodeEditor({ roomId }) {
  const [code, setCode] = useState('');

  useEffect(() => {
    async function loadCode() {
      const savedCode = await fetchRoomCode(roomId);
      setCode(savedCode);
    }
    loadCode();

    // Connect socket
    socket = io('http://localhost:5000');
    socket.emit('join-room', roomId);

    socket.on('code-change', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit('code-change', { roomId, code: newCode });
    saveRoomCode(roomId, newCode); // Save to DB
  };

  return (
    <textarea
      className="w-full h-[500px] p-4 border rounded"
      value={code}
      onChange={handleChange}
      placeholder="Start coding..."
    />
  );
}
