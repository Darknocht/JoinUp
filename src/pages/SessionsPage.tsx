import React, { useState } from 'react';
import { SessionCard } from '../components/SessionCard';
import type { Session } from '../types';
import { useDarkMode } from "../usefullFunctions.ts";
import { DollarSign, MapPin, Star, X } from "lucide-react";

interface SessionsPageProps {
  onOpenCreate: () => void;
}

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
    description: 'Looking for one more player for a friendly doubles match!',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80'
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
    description: 'Competitive 5v5 game. Must be able to play full court.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80'
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
    description: 'Casual 11v11 match, everyone welcome!',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80'
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
    description: 'Beach volleyball fun session. 4v4 rotating teams.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80'
  }
];

const mockMySessions: Session[] = [];

export const SessionsPage: React.FC<SessionsPageProps> = ({ onOpenCreate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'public' | 'mine'>('public');
  const isDarkMode = useDarkMode();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const colors = {
    bgPage: isDarkMode ? '#121212' : '#F9FAFB',
    bgCard: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    bgInput: isDarkMode ? '#2D2D2D' : '#F3F4F6',
    textMain: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#A0A0A0' : '#6B7280',
    border: isDarkMode ? '#333333' : '#F3F4F6',
  };

  const theme = {
    bg: isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#F9FAFB]',
    card: isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    subText: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    input: isDarkMode ? 'bg-[#1E1E1E] text-white' : 'bg-[#F1F3F5] text-gray-700',
  };

  return (
      <div className="p-6 min-h-screen pb-24 md:pb-6">
        {/* Header */}
        <header className="flex justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black leading-tight" style={{ color: colors.textMain, marginBottom: '0' }}>
              Sports Sessions
            </h1>
            <p style={{ color: colors.textSecondary }} className="font-medium">
              Find and join public sports activities
            </p>
          </div>
          <button
              onClick={onOpenCreate}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ marginRight: '10px' }}
          >
            <span className="text-xl" style={{ marginRight: '0.5em' }}>+</span> Create Session
          </button>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', backgroundColor: colors.bgInput, padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
          {(['public', 'mine'] as const).map((tab) => (
              <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  style={{
                    padding: '10px 28px', borderRadius: '10px', border: 'none',
                    backgroundColor: activeSubTab === tab ? colors.bgCard : 'transparent',
                    color: activeSubTab === tab ? colors.textMain : colors.textSecondary,
                    fontWeight: 'bold', cursor: 'pointer', transition: '0.2s'
                  }}
              >
                {tab === "public" ? `Public Sessions (${mockSessions.length})` : `My Sessions (${mockMySessions.length})`}
              </button>
          ))}
        </div>

        {/* Grille */}
        {(() => {
          const currentSessions = activeSubTab === 'public' ? mockSessions : mockMySessions;

          if (currentSessions.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="text-xl font-bold" style={{ color: colors.textMain }}>
                    No {activeSubTab === 'public' ? 'public' : 'of your'} sessions found...
                  </h3>
                  <p className="max-w-xs mt-2 font-medium" style={{ color: colors.textSecondary }}>
                    {activeSubTab === 'public'
                        ? "There are no public activities available at the moment."
                        : "You haven't joined or created any sessions yet."}
                  </p>
                </div>
            );
          }

          return (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSessions.map((session) => (
                      <SessionCard key={session.id} session={session} onAction={() => setSelectedSession(session)} />
                  ))}
                </div>
              </div>
          );
        })()}

        {/* --- POPUP DETAILS --- */}
        {selectedSession && (
            <div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', marginTop: '2.5em', backgroundColor: 'rgba(0,0,0,.5)'}}
                onClick={() => setSelectedSession(null)}
            >
              <div
                  className={`${theme.card} w-full max-w-[850px] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 items-center`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                {/* Bouton Fermer */}
                <button
                    onClick={() => setSelectedSession(null)}
                    className="absolute top-6 right-8 flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    style={{marginLeft: '40em'}}
                >
                  <X size={20} /> <span className="text-sm font-bold" >Close</span>
                </button>

                {/* Photo */}
                <div className="w-full md:w-auto flex justify-center shrink-0">
                  <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[24px] overflow-hidden shadow-xl bg-gray-200">
                    <img
                        src={selectedSession.image}
                        alt={selectedSession.clubName}
                        className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Contenu */}
                <div className="w-full flex flex-col">
                  <h3 className={`text-lg font-bold ${theme.text}`} style={{ marginBottom: '0em' }}>
                    {selectedSession.clubName}
                    <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500 ml-2" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              {selectedSession.sport}
            </span>
                  </h3>

                  <p className={`${theme.subText} text-sm flex items-center gap-1.5 mb-6`} style={{ marginTop: '0em', marginBottom: '0.5em' }}>
                    <MapPin size={18} /> Wrocław, Poland
                  </p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-4 mt-3">
              <span className="text-yellow-400 text-xs">
                <Star size={20} fill="#FDC700" color="#FDC700" />
                <span className={theme.text}> 4.8</span>
              </span>
                      <span className={`text-xs font-bold ${theme.text}`}>
                <DollarSign size={18} style={{ marginLeft: '10px' }} /> 80 PLN <span className="text-gray-400 font-normal">/session</span>
              </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
            <span className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 text-gray-500 font-medium">
              {selectedSession.level}
            </span>
                    <span className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 text-gray-500 font-medium">
              {selectedSession.date} at {selectedSession.time}
            </span>
                    <span className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 text-gray-500 font-medium">
              {selectedSession.currentPlayers}/{selectedSession.maxPlayers} players
            </span>
                  </div>

                  <p className="text-blue-500 text-sm font-medium mb-8 italic" style={{ marginTop: '0em' }}>
                    {selectedSession.description}
                  </p>

                  <button className="w-full bg-[#050509] text-white font-bold py-4 rounded-2xl text-lg transition-transform active:scale-95 shadow-lg">
                    Join Session
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};