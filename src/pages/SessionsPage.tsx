import React, { useState } from 'react';
import { SessionCard } from '../components/SessionCard';
import type { Session } from '../types';
import {Calendar, Clock, DollarSign, MapPin, Star, Users, X} from "lucide-react";
import {getColors, getTheme, useDarkMode} from "../usefullFunctions.ts";
import {mockSessions, mockMySessions} from "../mockData.ts";

interface SessionsPageProps {
  onOpenCreate: () => void;
}

export const SessionsPage: React.FC<SessionsPageProps> = ({ onOpenCreate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'public' | 'mine'>('public');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const isDarkMode = useDarkMode();
  const colors = getColors(isDarkMode);
  const theme = getTheme(isDarkMode);

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

        {/* Grid */}
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
                  className={`${getTheme(isDarkMode).bg} w-full max-w-[850px] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 items-center`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                {/* Button close */}
                <button
                    onClick={() => setSelectedSession(null)}
                    className={`${getTheme(isDarkMode).input}absolute top-6 right-8 flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors z-10`}
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

                {/* Content */}
                <div className="w-full flex flex-col">
                  <h3 className={`text-lg font-bold ${theme.text}`} style={{ marginBottom: '0em' }}>
                    {selectedSession.clubName}
                    <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500 ml-2" style={{ paddingLeft: '5px', paddingRight: '5px', marginLeft: '1em' }}>
              {selectedSession.sport}
            </span>
                  </h3>

                  <p className={`${theme.subText} text-sm flex items-center gap-1.5 mb-6`} style={{ marginTop: '0em', marginBottom: '0.5em' }}>
                    <MapPin size={18} /> {selectedSession.address}
                  </p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-4 mt-3">
              <span className="text-yellow-400 text-xs">
                <Star size={20} fill="#FDC700" color="#FDC700" />
                <span className={theme.text}>{selectedSession.rating}</span>
              </span>
                      <span className={`text-xs font-bold ${theme.text}`}>
                <DollarSign size={18} style={{ marginLeft: '10px' }} /> {selectedSession.pricePerHour} PLN <span className="text-gray-400 font-normal">/session</span>
              </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {selectedSession.tags.map(tag => (
                        <span key={tag} className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium" style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', marginBottom: '10px', marginRight: '5px'}}>{tag}</span>
                    ))}
                  </div>
                  <p className="text-blue-500 text-sm font-medium mb-8 italic" style={{ marginTop: '0em' }}>
                    {selectedSession.description}
                  </p>
                  <div className="flex flex-col gap-2 text-sm font-medium items-start text-gray-700 mb-3" style={{marginBottom: '2em'}}>
                    <span><Calendar size={18} /> {selectedSession.date}</span>
                    <span><Clock size={18} /> {selectedSession.time}</span>
                    <span><Users size={18} /> {selectedSession.currentPlayers}/{selectedSession.maxPlayers} players</span>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};