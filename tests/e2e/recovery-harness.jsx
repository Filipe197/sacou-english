import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../src/lib/auth.jsx';
import LessonRunner from '../../src/components/LessonRunner.jsx';
import { finishSession } from '../../src/lib/finish-session.js';
import '../../src/styles.css';
import '../../src/ai.css';
import '../../src/notebook.css';

const entries = [{ item: { id: 'recovery-test', type: 'meaning', en: 'Hello', options: ['Olá', 'Adeus'], answer: 'Olá', explanation: 'Hello significa olá.' }, lessonId: 'review', unit: { level: 'A1' } }];
function Harness() {
  const { setProfile } = useAuth();
  return <LessonRunner entries={entries} title="Revisão" introduceWords={false} onFinish={({ score, attemptId }) => finishSession({
    uid: '00000000-0000-4000-8000-0000000000d1', lessonId: 'review', score, xp: 5, activity: 'review', attemptId, setProfile,
  })} />;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><AuthProvider><Harness /></AuthProvider></BrowserRouter>);
