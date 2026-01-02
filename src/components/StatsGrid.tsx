import { Trophy, Users, Clock, Medal } from "lucide-react";

export const StatsGrid = ({ userData, colors, cardStyle }: any) => {
    const stats = [
        { label: 'Games Played', value: userData.gamesPlayed, color: '#F59E0B', icon: <Trophy/> },
        { label: 'Sessions Joined', value: userData.sessionsJoined, color: '#10B981', icon: <Users /> },
        { label: 'Hours Played', value: userData.totalHours, color: '#3B82F6', icon: <Clock /> },
        { label: 'Badges', value: userData.badgesCount, color: '#8B5CF6', icon: <Medal/> }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px', width: '100%' }}>
            {stats.map((stat, i) => (
                <div key={i} style={{ ...cardStyle, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: colors.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <span style={{ color: stat.color, paddingTop: '8px' }}>{stat.icon}</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</div>
                        <div style={{ fontSize: '14px', color: colors.textSecondary }}>{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};