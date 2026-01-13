import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useDarkMode, getTheme} from "../usefullFunctions.ts";
import { Funnel, MapPin } from "lucide-react";
import { FacilityCard } from '../components/FacilityCard';
import { FacilityDetailsModal } from '../components/FacilityDetailsModal';
import type {HomePageProps, SportType} from "../types.ts";
import {facilitiesData} from "../mockData.ts";
import {createCustomIcon} from "../usefullFunctions.ts";
import {BookingModal} from "../components/BookingModal.tsx";

const sports: SportType[] = ['Padel', 'Basketball', 'Football', 'Tennis', 'Volleyball'];

const blueIcon = createCustomIcon('#2563eb');
const grayIcon = createCustomIcon('#9ca3af');

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => { map.invalidateSize(); }, 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

export const DiscoverPage: React.FC<HomePageProps> = ({onTabChange}) => {
  const isDarkMode = useDarkMode();
  const theme = getTheme(isDarkMode);

  const [activeSport, setActiveSport] = useState<SportType | 'All'>('All');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [bookingFacility, setBookingFacility] = useState<any>(null);

  const bgPage = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToFacility = (id: string) => {
    setHighlightedId(id);
    itemRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setHighlightedId(null), 2000);
  };

  const filteredFacilities = facilitiesData.filter(facility => {
    const matchesSport = activeSport === 'All' || facility.sport === activeSport;
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
      <div className={`flex flex-col lg:flex-row h-screen w-full ${theme.bg} font-sans overflow-hidden relative`}>

        {/* --- SECTION CARD (LEFT) --- */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-full order-2 lg:order-1 border-r border-gray-200 dark:border-white/5">
          <div className="absolute inset-0 z-[1001] pointer-events-none p-6 flex flex-col justify-between">
            <div className="flex justify-start">
              <div
                  className="pointer-events-auto shadow-xl flex items-center gap-2 border border-black/5"
                  style={{ borderRadius: '12px', padding: '8px 16px', backgroundColor: bgPage, backdropFilter: 'blur(8px)', marginLeft: '20px', marginTop: '20px' }}
              >
                <span className="text-red-500">📍</span>
                <span className={`text-xs font-bold ${theme.text}`}>Wrocław, Poland</span>
              </div>
            </div>

            <div className="flex justify-start">
              <div className={`${theme.card} pointer-events-auto p-5 rounded-2xl shadow-2xl border min-w-[150px]`} style={{ borderRadius: '12px', padding: '8px 16px', backgroundColor: bgPage, backdropFilter: 'blur(8px)', marginTop: '50px', marginLeft: '20px' }}>
                <p className="text-[10px] font-black text-gray-400 mb-3 tracking-widest">Legend:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                    <span className={`text-xs font-bold ${theme.text}`}><MapPin size={18} style={{color: '#3B82F6'}} /> Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className={`text-xs font-bold ${theme.text}`}><MapPin size={18} /> Unavailable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MapContainer center={[51.1079, 17.0385]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 10 }} zoomControl={false}>
            <ResizeMap />
            <TileLayer url={isDarkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"} />
            {filteredFacilities.map(facility => (
                <Marker key={facility.id} position={facility.position} icon={facility.isAvailable ? blueIcon : grayIcon} eventHandlers={{ click: () => scrollToFacility(facility.id) }}>
                  <Popup>{facility.name}</Popup>
                </Marker>
            ))}
          </MapContainer>
        </div>

        {/* --- SECTION LIST (RIGHT) --- */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 overflow-y-auto no-scrollbar h-full order-1 lg:order-2">
          <header className="mb-8">
            <h1 className={`text-2xl font-bold ${theme.text} mb-6`}>Discover Sports Facilities</h1>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 translate-x-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </span>
                <input type="text" placeholder="Search facilities or locations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-9/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}} />
              </div>
              <button className={`${getTheme(isDarkMode).input} border px-4 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-opacity-80 transition-all`} style={{marginRight: '10px', padding: '5px', paddingRight: '10px'}}>
                <Funnel size={16} style={{paddingLeft: '10px', paddingRight: '10px'}} className="text-gray-400" />
                <span className={theme.text}>Filters</span>
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" style={{marginBottom: '10px', marginTop: '10px'}}>
              <button onClick={() => setActiveSport('All')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSport === 'All' ? '' : `border ${theme.subText}`}`} style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: activeSport === 'All' ? (isDarkMode ? '#F9FAFB' : '#0f0f0f') : (isDarkMode ? '' : '#F1F3F5'), color: activeSport === 'All' ? (isDarkMode ? '#0f0f0f' : '#FFFFFF') : 'inherit', border: activeSport === 'All' ? `1px solid ${isDarkMode ? '#F9FAFB' : '#0f0f0f'}` : undefined }}>
                All Sports
              </button>
              {sports.map((sport) => (
                  <button key={sport} onClick={() => setActiveSport(sport)} className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeSport === sport ? '' : `border ${theme.subText}`}`} style={{ marginRight: '10px', backgroundColor: activeSport === sport ? (isDarkMode ? '#F9FAFB' : '#0f0f0f') : (isDarkMode ? '' : '#F1F3F5'), color: activeSport === sport ? (isDarkMode ? '#0f0f0f' : '#FFFFFF') : 'inherit', border: activeSport === sport ? `1px solid ${isDarkMode ? '#F9FAFB' : '#0f0f0f'}` : '1px solid transparent' }}>
                    {sport}
                  </button>
              ))}
            </div>
          </header>

          <div className="space-y-4">
            {filteredFacilities.map((facility) => (
                <FacilityCard
                    key={facility.id}
                    facility={facility}
                    theme={theme}
                    highlightedId={highlightedId}
                    onDetails={setSelectedFacility}
                    onBook={setBookingFacility}
                    itemRef={(el: any) => itemRefs.current[facility.id] = el}
                />
            ))}
          </div>
        </div>

        {selectedFacility && (
            <FacilityDetailsModal
                selectedFacility={selectedFacility}
                theme={theme}
                onClose={() => setSelectedFacility(null)}
            />
        )}
        {bookingFacility && (
            <BookingModal
                selectedFacility={bookingFacility}
                theme={theme}
                onTabChange={onTabChange}
                onClose={() => setBookingFacility(null)}
            />
        )}
      </div>
  );
};