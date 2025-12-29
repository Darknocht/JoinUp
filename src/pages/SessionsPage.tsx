import React, { useState } from 'react';
import { SessionCard } from '../components/SessionCard';
import type { Session } from '../types';

interface SessionsPageProps {
  onOpenCreate: () => void;
}

// Données issues de la maquette Figma [cite: 73-130]
const mockSessions: Session[] = [
  {
    id: '1',
    sport: 'Padel',
    clubName: 'Wrocław Padel Club',
    level: 'Intermediate',
    date: '10/29/2025',
    time: '18:00',
    currentPlayers: 3,
    maxPlayers: 4,
    description: 'Looking for one more player for a friendly doubles match!' // [cite: 90]
  },
  {
    id: '2',
    sport: 'Basketball',
    clubName: 'Arena Basketball Center',
    level: 'Advanced',
    date: '10/30/2025',
    time: '20:00',
    currentPlayers: 8,
    maxPlayers: 10,
    description: 'Competitive 5v5 game. Must be able to play full court.' // [cite: 93]
  },
  {
    id: '3',
    sport: 'Football',
    clubName: 'Stadion Olimpijski',
    level: 'Beginner',
    date: '10/29/2025',
    time: '19:00',
    currentPlayers: 14,
    maxPlayers: 22,
    description: 'Casual 11v11 match, everyone welcome!' // [cite: 97]
  },
  {
    id: '4',
    sport: 'Volleyball',
    clubName: 'Beach Volleyball Arena',
    level: 'Intermediate',
    date: '10/31/2025',
    time: '17:00',
    currentPlayers: 5,
    maxPlayers: 8,
    description: 'Beach volleyball fun session. 4v4 rotating teams.' // [cite: 107]
  }
];

const mockMySessions: Session[] = [];

export const SessionsPage: React.FC<SessionsPageProps> = ({ onOpenCreate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'public' | 'mine'>('public');

  return (
    <div className="p-6 min-h-screen pb-24 md:pb-6">
      {/* Header avec Titre et Bouton Créer [cite: 70, 71, 82] */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">Sports Sessions</h1>
          <p className="text-gray-500 font-medium">Find and join public sports activities</p>
        </div>
        <button 
          onClick={onOpenCreate}
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Create Session
        </button>
      </header>

      {/* Navigation par onglets secondaires [cite: 72] */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button 
          onClick={() => setActiveSubTab('public')}
          className={`pb-4 font-bold transition-colors relative ${
            activeSubTab === 'public' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          Public Sessions ({mockSessions.length})
          {activeSubTab === 'public' && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveSubTab('mine')}
          className={`pb-4 font-bold transition-colors relative ${
            activeSubTab === 'mine' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          My Sessions ({mockMySessions.length})
          {activeSubTab === 'mine' && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Grille de Sessions */}
      {activeSubTab === 'public' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        /* État vide pour "My Sessions"  */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">👟</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">No sessions found...</h3>
          <p className="text-gray-400 max-w-xs mt-2 font-medium">
            You haven't joined or created any sessions yet.
          </p>
        </div>
      )}
    </div>
  );
};