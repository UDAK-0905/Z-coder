// zcoder-frontend/lib/api.js

const API_URL = 'http://localhost:5000/api';

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return await res.json();
}

export async function fetchRoomCode(roomId) {
  const res = await fetch(`${API_URL}/code/${roomId}`);
  const data = await res.json();
  return data.code || '';
}

export async function saveRoomCode(roomId, code) {
  await fetch(`${API_URL}/code/${roomId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
}