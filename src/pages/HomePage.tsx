import React from 'react';
import { MapPin, Users, Trophy, TrendingUp } from 'lucide-react';

interface HomePageProps {
    onTabChange: (tab: 'Home' | 'Discover' | 'Sessions' | 'Profile') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
    return (
        <div className=" min-h-screen min-w-full">

            {/* --- SECTION HERO --- */}
            <section className=" px-8 py-20 md:py-32 text-white" style={{ backgroundColor: '#2563eb', paddingBottom: '16px' }}>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{color: '#FFFFFF'}}>
                        Play Sports.<br />
                        Connect Locally.<br />
                        Level Up.
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-10" style={{ color: '#dbeafe' }}>
                        Discover sports facilities across Wrocław, join exciting sessions, and connect with fellow athletes.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => onTabChange('Discover')}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
                            style={{ backgroundColor: '#ffffff', color: '#2563eb', marginLeft: '16px', marginRight: '16px' }}
                        >
                            <MapPin size={18} style={{paddingRight: '10px'}} />
                            Find Facilities
                        </button>
                        <button
                            onClick={() => onTabChange('Sessions')}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border transition-colors"
                            style={{ backgroundColor: '#ffffff', color: '#2563eb' }}
                        >
                            <Users size={18} style={{paddingRight: '10px'}} />
                            Browse Sessions
                        </button>
                    </div>
                </div>
            </section>

            {/* --- SECTION WHY JOINUP? --- */}
            <section className="py-20 px-8" >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-16">Why JoinUp?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 */}
                        <div className="bg-white p-8 rounded-2xl border flex flex-col items-center shadow-sm" style={{ borderColor: '#f3f4f6' }}>
                            <div className="mb-6 p-4 rounded-full" style={{color: '#2563eb' }}>
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Discover Facilities</h3>
                            <p className="leading-relaxed text-sm" style={{ color: '#6b7280' }}>
                                Find the perfect court or field near you with our interactive map. Filter by sport, price, and availability.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white p-8 rounded-2xl border flex flex-col items-center shadow-sm" style={{ borderColor: '#f3f4f6' }}>
                            <div className="mb-6 p-4 rounded-full" style={{color: '#2563eb' }}>
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Join Sessions</h3>
                            <p className="leading-relaxed text-sm" style={{ color: '#6b7280' }}>
                                Connect with other players and join public sports sessions. Make new friends and stay active.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white p-8 rounded-2xl border flex flex-col items-center shadow-sm" style={{ borderColor: '#f3f4f6' }}>
                            <div className="mb-6 p-4 rounded-full" style={{color: '#2563eb' }}>
                                <Trophy size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Track Progress</h3>
                            <p className="leading-relaxed text-sm" style={{ color: '#6b7280' }}>
                                Earn badges, track your stats, and level up your profile as you play more games.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION SKILLS --- */}
            <section className="py-12 border-y" style={{ borderColor: '#f3f4f6' }}>
                <div className="max-w-6xl mx-auto px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold" style={{ color: '#2563eb' }}>150+</div>
                            <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Active Facilities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold" style={{ color: '#2563eb' }}>2.5K+</div>
                            <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Athletes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold" style={{ color: '#2563eb' }}>500+</div>
                            <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Weekly Sessions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold" style={{ color: '#2563eb' }}>12K+</div>
                            <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Games Played</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION READY TO GET STARTED --- */}
            <section className="p-8 md:p-12">
                <div
                    className="max-w-6xl mx-auto rounded-3xl p-12 text-center text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)' }}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <TrendingUp size={48} className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Ready to Get Started?</h2>
                        <p className="mb-8 max-w-xl mx-auto" style={{ color: '#dbeafe' }}>
                            Explore sports facilities on our interactive map and book your first session today.
                        </p>
                        <button
                            onClick={() => onTabChange('Discover')}
                            className="w-full md:w-auto px-12 py-3 rounded-xl font-bold transition-colors shadow-lg"
                            style={{backgroundColor: '#ffffff', color: '#2563eb' }}
                        >
                            Explore Map
                        </button>
                    </div>
                    <div
                        className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full -mr-20 -mt-20"
                    ></div>
                </div>
            </section>
        </div>
    );
};