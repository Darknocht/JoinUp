import React from 'react';
import type { SessionCardProps } from '../types';
import {Calendar, Clock, Users} from "lucide-react";
import {useDarkMode} from "../usefullFunctions.ts";

export const SessionCard: React.FC<SessionCardProps> = ({ session, onAction }) => {
  const spotsLeft = session.maxPlayers - session.currentPlayers;
    const isDarkMode = useDarkMode();

  return (
    <div className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100" style={{marginBottom: '1em'}}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="bg-blue-50 text-blue-700 text-sm font-bold px-2 py-1 rounded" style={{marginBottom: '0em'}}>
          {session.sport}
        </h3>
        <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[12px] px-2 py-0.5 font-bold text-gray-500" style={{paddingLeft: '5px', paddingRight: '5px', marginRight: '10px', backgroundColor: (isDarkMode ? '#F9FAFB' : '#0f0f0f'), color: (isDarkMode ? '#0f0f0f' : '#FFFFFF')}}>
          {session.level}
        </span>
      </div>
      
      <p className="font-bold text-gray-900" style={{marginTop: '0.25em'}}>{session.clubName}</p>

        <div className="flex flex-col gap-2 text-sm font-medium items-start text-gray-700 mb-3">
            <span><Calendar size={18} /> {session.date}</span>
            <span><Clock size={18} /> {session.time}</span>
            <span><Users size={18} /> {session.currentPlayers}/{session.maxPlayers} players</span>
        </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {session.description}
      </p>
      
      <button onClick={onAction} className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-200">
        View Details
      </button>
        <div className="flex gap-4 text-sm font-medium justify-around text-gray-700 mb-3">
            <p className="text-sm text-gray-400 mb-2">{spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left</p>
        </div>
    </div>
  );
};