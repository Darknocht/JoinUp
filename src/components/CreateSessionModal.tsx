import React, { useState } from 'react';
import type { SportType } from '../types';
import { X, Upload } from 'lucide-react';

export const CreateSessionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    place: '',
    sport: 'Padel' as SportType,
    date: '',
    hour: '',
    maxPlayers: 4,
    price: 0,
    description: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-900">Create Session</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Upload Image [cite: 511] */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-400 cursor-pointer transition">
            <Upload size={32} className="mb-2" />
            <span className="text-sm font-bold">Upload an image</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Title</label>
              <input type="text" placeholder="Friendly match..." className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Date</label>
              <input type="date" className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Hour</label>
              <input type="time" className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Max Players</label>
              <input type="number" className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Price (PLN)</label>
              <input type="number" className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Description</label>
            <textarea rows={3} placeholder="Describe the level or rules..." className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95">
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};