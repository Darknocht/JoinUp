import { Home, Search, Calendar, User } from 'lucide-react';
import {useDarkMode} from "../usefullFunctions.ts";

interface SidebarProps {
    activeTab: 'Home' | 'Discover' | 'Sessions' | 'Profile';
    onTabChange: (tab: 'Home' | 'Discover' | 'Sessions' | 'Profile') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    const isDark = useDarkMode();
    return (
        <nav
            className="fixed top-0 left-0 w-screen border-b border-gray-200 dark:border-white/10 px-6 py-3 flex items-center justify-between z-50 transition-colors duration-300"
            style={{
                paddingTop: '1em',
                paddingBottom: '1em',
                backgroundColor: isDark ? '#121212' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
            }}
        >
            {/* Partie Gauche */}
            <div className="flex items-center gap-3 shrink-0">
                <div
                    className="text-white w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center font-bold text-lg shadow-lg"
                    style={{ backgroundColor: '#2563eb', display: 'flex', borderRadius: '10px', padding: '0.5em', paddingLeft: '0.001em', paddingRight: '0.001em' ,marginLeft: '10px', marginRight: '10px', color: '#FFFFFF' }}
                >
                    <div>JU</div>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-white text-lg leading-tight whitespace-nowrap">JoinUp Wrocław</span>
                    <span className="text-gray-500 text-[10px] tracking-wider">Play. Connect. Compete.</span>
                </div>
            </div>

            {/* Partie Droite */}
            <div className="flex flex-row items-center" style={{ paddingRight: '20px' }}>
                <NavItem
                    icon={<Home size={18} />}
                    label="Home"
                    active={activeTab === 'Home'}
                    onClick={() => onTabChange('Home')}
                />
                <NavItem
                    icon={<Search size={18} />}
                    label="Discover"
                    active={activeTab === 'Discover'}
                    onClick={() => onTabChange('Discover')}
                />
                <NavItem
                    icon={<Calendar size={18} />}
                    label="Sessions"
                    active={activeTab === 'Sessions'}
                    onClick={() => onTabChange('Sessions')}
                />
                <NavItem
                    icon={<User size={18} />}
                    label="Profile"
                    active={activeTab === 'Profile'}
                    onClick={() => onTabChange('Profile')}
                />
            </div>
        </nav>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
    <button
        onClick={onClick}
        type="button"
        // Modification : On s'assure que bg-transparent est utilisé par défaut
        className={`flex flex-row items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 shrink-0 bg-transparent ${
            active
                ? 'text-white shadow-lg shadow-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
        }`}
        style={{
            marginRight: '16px',
            // L'arrière-plan bleu ne s'applique QUE si active est vrai
            ...(active ? { backgroundColor: '#2563eb', color: '#FFFFFF' } : { backgroundColor: 'transparent' })
        }}
    >
        <span className="flex items-center justify-center" style={{paddingRight: '10px'}}>
            {icon}
        </span>

        <span className="text-sm font-semibold whitespace-nowrap">
            {label}
        </span>
    </button>
);