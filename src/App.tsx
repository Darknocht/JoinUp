import React, { useState } from 'react';
import { DiscoverPage } from './pages/DiscoverPage';
import { ProfilePage } from './pages/ProfilePage';
import { SessionsPage } from './pages/SessionsPage';
import { Sidebar } from './components/Sidebar';
import { CreateSessionModal } from './components/CreateSessionModal';
import {HomePage} from "./pages/HomePage.tsx";
import 'leaflet/dist/leaflet.css';

type Tab = 'Home' | 'Discover' | 'Sessions' | 'Profile';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return <HomePage onTabChange={setActiveTab} />;
            case 'Discover':
                return <DiscoverPage onTabChange={setActiveTab}/>;
            case 'Sessions':
                return <SessionsPage onOpenCreate={() => setIsModalOpen(true)} />;
            case 'Profile':
                return <ProfilePage />;
            default:
                return <HomePage onTabChange={setActiveTab} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1 pt-20 px-4 sm:px-6 relative z-10">
                <div className="w-full" style={{paddingTop: '2.5em'}}>
                    {renderContent()}
                </div>
            </main>

            <CreateSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default App;