'use client';
import { useParams } from 'next/navigation';
import CodeEditor from '@/components/CodeEditor';

import ProtectedRoute from '@/components/ProtectedRoute';
import CodeEditor from '@/components/CodeEditor';

export default function RoomPage() {
  const { id: roomId } = useParams();

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Room: {roomId}</h1>
        <CodeEditor roomId={roomId} />
      </div>
    </ProtectedRoute>
  );
}
