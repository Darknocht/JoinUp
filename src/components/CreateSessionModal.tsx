import React, { useState, useRef } from 'react';
import type { SportType } from '../types';
import { X, Upload } from 'lucide-react';
import { useDarkMode, getTheme} from "../usefullFunctions.ts";

export const CreateSessionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const isDarkMode = useDarkMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    place: '',
    sport: 'Padel' as SportType,
    date: '',
    hour: '',
    maxPlayers: '',
    price: '',
    description: '',
    subtitle: '',
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'maxPlayers' ? Number(value) : value
    }));
  };

  const theme = {
    card: isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    input: isDarkMode ? 'bg-[#2D2D2D] text-white' : 'bg-gray-50 text-gray-900',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data send :', formData);
  };

  return (
      <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', marginTop: '4.75em', backgroundColor: 'rgba(0,0,0,.5)'}}
          onClick={onClose}
      >
        <div
            className={`${getTheme(isDarkMode).bg} w-full max-w-[850px] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 items-center`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto', backgroundColor: getTheme(isDarkMode).bg}}
        >
          <button
              onClick={onClose}
              className={`${getTheme(isDarkMode).input} absolute top-6 right-8 flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors z-10`}
              style={{ marginLeft: '40em' }}
          >
            <X size={20} /> <span className="text-sm font-bold">Close</span>
          </button>

          <div className="w-full md:w-auto flex justify-center shrink-0">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <div
                className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[24px] overflow-hidden shadow-xl bg-blue-600 flex flex-col items-center justify-center text-white p-6 cursor-pointer hover:bg-blue-700 transition-colors border-4 border-dashed border-blue-400 relative"
                onClick={() => fileInputRef.current?.click()}
            >
              {previewImage ? (
                  <img src={previewImage} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
              ) : (
                  <>
                    <Upload size={48} className="mb-4" />
                    <p className="font-black text-lg text-center leading-tight">Upload Session Banner</p>
                    <p className="text-xs text-blue-100 mt-2 text-center">Click to select a photo for your match</p>
                  </>
              )}
            </div>
          </div>

          <form className="w-full flex flex-col gap-4 no-scrollbar" onSubmit={handleSubmit}>
            <h2 className={`text-2xl font-black ${theme.text}`}>Create Session</h2>

            <div className="space-y-4">
              <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className={`w-9/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px', marginBottom: '1em'}}
                />
              </div>

              <div className="grid grid-cols-2 gap-4" style={{marginBottom: '1em'}}>
                <div>
                  <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      placeholder="Place"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      placeholder="Subtitle"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4" style={{marginBottom: '1em'}}>
                <div>
                  <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Tags"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
                <div>
                  <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      className={`w-6/7 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  >
                    <option value="Padel">Padel</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Volleyball">Volleyball</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4" style={{marginBottom: '1em'}}>
                <div>
                  <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
                <div>
                  <input
                      type="number"
                      name="maxPlayers"
                      value={formData.maxPlayers}
                      onChange={handleChange}
                      placeholder="Max Players"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4" style={{marginBottom: '1em'}}>
                <div>
                  <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="Date"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
                <div>
                  <input
                      type="time"
                      name="hour"
                      value={formData.hour}
                      onChange={handleChange}
                      placeholder="Hour"
                      className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95" style={{marginBottom: '4em'}}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};