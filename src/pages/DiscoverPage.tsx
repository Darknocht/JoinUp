import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDarkMode } from "../usefullFunctions.ts";
import {DollarSign, Funnel, MapPin} from "lucide-react";

// --- Configuration des Icônes ---
const createCustomIcon = (color: string) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const blueIcon = createCustomIcon('#2563eb');
const grayIcon = createCustomIcon('#9ca3af');

// --- Types & Données ---
type SportType = 'Padel' | 'Basketball' | 'Football' | 'Tennis' | 'Volleyball';

const sports: SportType[] = ['Padel', 'Basketball', 'Football', 'Tennis', 'Volleyball'];

const facilitiesData = [
  { id: '1', name: 'Wrocław Padel Club', sport: 'Padel', address: 'ul. Sportowa 12, Wrocław', rating: 4.8, pricePerHour: 80, tags: ['Parking', 'Showers', 'Equipment Rental'], image: 'https://images.unsplash.com/photo-1592910710242-70656469236a?auto=format&fit=crop&w=600&q=80', position: [51.1079, 17.0385] as [number, number], isAvailable: true },
  { id: '2', name: 'Arena Basketball Center', sport: 'Basketball', address: 'ul. Grabiszyńska 45, Wrocław', rating: 4.6, pricePerHour: 60, tags: ['Indoor Court', 'Lockers', 'LED Lighting', 'Parking', 'Showers'], image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80', position: [51.0950, 17.0150] as [number, number], isAvailable: true },
  { id: '3', name: 'Stadion Olimpijski', sport: 'Football', address: 'ul. Paderewskiego 35, Wrocław', rating: 4.9, pricePerHour: 120, tags: ['Grass Field', 'Floodlights', 'Changing Rooms', 'Parking'], image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80', position: [51.1180, 17.0980] as [number, number], isAvailable: false }
];

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

export const DiscoverPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const [activeSport, setActiveSport] = useState<SportType | 'All'>('All');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const bgPage = isDarkMode ? '#1E1E1E' : '#FFFFFF';

  // Ref pour le défilement de la liste
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToFacility = (id: string) => {
    setHighlightedId(id);
    itemRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setHighlightedId(null), 2000);
  };

  // Logique de filtrage unique pour la Carte et la Liste
  const filteredFacilities = facilitiesData.filter(facility => {
    const matchesSport = activeSport === 'All' || facility.sport === activeSport;
    const matchesSearch =
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSport && matchesSearch;
  });

  const theme = {
    bg: isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#F9FAFB]',
    card: isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    subText: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    input: isDarkMode ? 'bg-[#1E1E1E] text-white' : 'bg-[#F1F3F5] text-gray-700',
  };

  return (
      <div className={`flex flex-col lg:flex-row h-screen w-full ${theme.bg} font-sans overflow-hidden`}>

        {/* --- SECTION CARTE (GAUCHE) --- */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-full order-2 lg:order-1 border-r border-gray-200 dark:border-white/5">

          {/* CONTENEUR UI FLOTTANT (Z-INDEX 1001) */}
          <div className="absolute inset-0 z-[1001] pointer-events-none p-6 flex flex-col justify-between">

            {/* Badge Wrocław */}
            <div className="flex justify-start">
              <div
                  className="pointer-events-auto shadow-xl flex items-center gap-2 border border-black/5"
                  style={{
                    borderRadius: '12px',
                    padding: '8px 16px',
                    backgroundColor: bgPage,
                    backdropFilter: 'blur(8px)',
                    marginLeft: '20px',
                    marginTop: '20px',
                  }}
              >
                <span className="text-red-500">📍</span>
                <span className={`text-xs font-bold ${theme.text}`}>Wrocław, Poland</span>
              </div>
            </div>

            {/* Légende (BAS GAUCHE) */}
            <div className="flex justify-start"> <div className={`${theme.card} pointer-events-auto p-5 rounded-2xl shadow-2xl border min-w-[150px]`} style={{ borderRadius: '12px', padding: '8px 16px', backgroundColor: bgPage, backdropFilter: 'blur(8px)', marginTop: '50px', marginLeft: '20px', }}>
              <p className="text-[10px] font-black text-gray-400 mb-3 tracking-widest">Legend:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                    <span className={`text-xs font-bold ${theme.text}`}><MapPin style={{color: '#3B82F6'}} /> Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className={`text-xs font-bold ${theme.text}`}><MapPin /> Unavailable</span>
                  </div>
                </div>
            </div>
            </div>
          </div>

          {/* COMPOSANT CARTE */}
          <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              style={{ height: '100%', width: '100%', zIndex: 10 }}
              zoomControl={false}
          >
            <ResizeMap />
            <TileLayer
                url={isDarkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
            />
            {filteredFacilities.map(facility => (
                <Marker
                    key={facility.id}
                    position={facility.position}
                    icon={facility.isAvailable ? blueIcon : grayIcon}
                    eventHandlers={{ click: () => scrollToFacility(facility.id) }}
                >
                  <Popup>{facility.name}</Popup>
                </Marker>
            ))}
          </MapContainer>
        </div>

        {/* --- SECTION LISTE (DROITE) --- */}
        <div
            ref={listRef}
            className="w-full lg:w-1/2 flex flex-col p-8 overflow-y-auto no-scrollbar h-full order-1 lg:order-2"
        >
          <header className="mb-8">
            <h1 className={`text-2xl font-bold ${theme.text} mb-6`}>Discover Sports Facilities</h1>

            {/* Barre de recherche style Image */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 translate-x-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </span>
                <input
                    type="text"
                    placeholder="Search facilities or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-9/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`}
                    style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                />
              </div>

              <button className={`${theme.card} border px-4 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-opacity-80 transition-all`} style={{marginRight: '10px', padding: '5px', paddingRight: '10px'}}>
                <Funnel size={16} style={{paddingLeft: '10px', paddingRight: '10px'}} className="text-gray-400" />
                <span className={theme.text}>Filters</span>
              </button>
            </div>

            {/* Sélecteur de Sport */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" style={{marginBottom: '10px', marginTop: '10px'}}>
              <button
                  onClick={() => setActiveSport('All')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSport === 'All' ? '' : `border ${theme.subText}`
                  }`}
                  style={{
                    marginRight: '10px',
                    marginLeft: '10px',
                    // Logique : Si sélectionné -> Inverser (Noir sur Blanc ou Blanc sur Noir), Sinon -> Thème
                    backgroundColor: activeSport === 'All'
                        ? (isDarkMode ? '#F9FAFB' : '#0f0f0f')
                        : '',
                    color: activeSport === 'All'
                        ? (isDarkMode ? '#0f0f0f' : '#FFFFFF')
                        : 'inherit',
                    border: activeSport === 'All'
                        ? `1px solid ${isDarkMode ? '#F9FAFB' : '#0f0f0f'}`
                        : undefined
                  }}
              >
                All Sports
              </button>

              {sports.map((sport) => {
                const isSelected = activeSport === sport;

                return (
                    <button
                        key={sport}
                        onClick={() => setActiveSport(sport)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                            isSelected ? '' : `border ${theme.subText}`
                        }`}
                        style={{
                          marginRight: '10px',
                          // Variables CSS dynamiques pour forcer le contraste
                          backgroundColor: isSelected
                              ? (isDarkMode ? '#F9FAFB' : '#0f0f0f')
                              : '',
                          color: isSelected
                              ? (isDarkMode ? '#0f0f0f' : '#FFFFFF')
                              : 'inherit',
                          border: isSelected
                              ? `1px solid ${isDarkMode ? '#F9FAFB' : '#0f0f0f'}`
                              : '1px solid transparent'
                        }}
                    >
                      {sport}
                    </button>
                );
              })}
            </div>
          </header>

          {/* Liste des Tuiles filtrées */}
          <div className="space-y-4">
            {filteredFacilities.map((facility) => (
                <div
                    key={facility.id}
                    ref={el => itemRefs.current[facility.id] = el}
                    className={`${theme.card} border rounded-[24px] overflow-hidden flex h-48 transition-all duration-500 ${highlightedId === facility.id ? 'ring-2 ring-blue-500 scale-[1.02] shadow-xl' : 'shadow-sm hover:shadow-md'}`}
                >
                  {/* Image */}
                  <div className="w-40 h-full shrink-0">
                    <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className={`text-lg font-bold ${theme.text}`}>{facility.name} <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500"
                                                                                                style={{paddingLeft: '5px', paddingRight: '5px'}}>
                              {facility.sport}
                        </span></h3>

                      </div>
                      <p className={`${theme.subText} text-xs mt-1`}><MapPin style={{marginRight: '5px'}}/>{facility.address}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-yellow-400 text-xs"><span style={{color: '#FDC700'}}>★</span> <span className={theme.text}>{facility.rating}</span></span>
                        <span className={`text-xs font-bold ${theme.text}`}><DollarSign style={{marginLeft: '10px', width: '1.25em', height: '1.25em'}} />{facility.pricePerHour} PLN <span className="text-gray-400 font-normal">/hour</span></span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {facility.tags.slice(0, 3).map(tag => (
                            <span key={tag}
                                  className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium"
                                  style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', marginBottom: '10px', marginRight: '5px'}}>{tag}</span>
                        ))}
                        {facility.tags.length > 3 && (
                            <span className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium"
                                  style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', marginBottom: '10px'}}>+{facility.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white text-xs font-bold py-2.5 rounded-xl transition-colors hover:bg-gray-800">Book Now</button>
                      <button className={`px-4 border ${theme.card} text-xs font-bold rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5`} style={{}}>Details</button>
                    </div>
                  </div>
                </div>
            ))}
            {filteredFacilities.length === 0 && (
                <div className="text-center py-10">
                  <p className={theme.subText}>No facilities found matching your criteria.</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};