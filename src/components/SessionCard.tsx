import React from 'react';
import type { Session } from '../types';

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const spotsLeft = session.maxPlayers - session.currentPlayers;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">
          {session.sport}
        </span>
        <span className={`text-xs font-bold ${spotsLeft <= 2 ? 'text-red-500' : 'text-orange-600'}`}>
          {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left
        </span>
      </div>
      
      <h4 className="font-bold text-gray-900">{session.clubName}</h4>
      <p className="text-sm text-gray-400 mb-2">{session.level}</p>
      
      <div className="flex gap-4 text-sm font-medium text-gray-700 mb-3">
        <span>📅 {session.date}</span>
        <span>🕒 {session.time}</span>
        <span className="text-blue-600 font-bold">👥 {session.currentPlayers}/{session.maxPlayers} players</span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
        "{session.description}"
      </p>
      
      <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-200">
        View Details
      </button>
    </div>
  );
};