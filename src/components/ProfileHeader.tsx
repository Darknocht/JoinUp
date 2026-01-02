export const ProfileHeader = ({ userData, colors, cardStyle }: any) => (
    <div style={{ ...cardStyle, marginBottom: '32px', marginTop: '42px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{
                width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '32px', fontWeight: 'bold',
                background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)'
            }}>
                {userData.initials}
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{userData.name}</h1>
                    <span style={{ backgroundColor: '#F59E0B', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>
            Level {userData.level}
          </span>
                </div>

                <div style={{ color: colors.textSecondary, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                    <span style={{ color: '#FBBF24' }}>★</span> {userData.rating} <span style={{ fontWeight: '400', fontSize: '14px' }}>rating</span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>
                        <span style={{ color: colors.textSecondary }}>Progress to Level {userData.level + 1}</span>
                        <span>{userData.progressToNextLevel}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: colors.progressRail, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${userData.progressToNextLevel}%`, height: '100%', backgroundColor: colors.progressFill }}></div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {userData.sports.map((sport: string) => (
                        <span key={sport} style={{ padding: '6px 16px', border: `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', color: colors.textSecondary, backgroundColor: colors.bgInput }}>
              {sport}
            </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);