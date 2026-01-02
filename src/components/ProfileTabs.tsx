export const ProfileTabs = ({ activeTab, setActiveTab, colors }: any) => (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', backgroundColor: colors.bgInput, padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
        {(['statistics', 'badges', 'activity'] as const).map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                    padding: '10px 28px', borderRadius: '10px', border: 'none',
                    backgroundColor: activeTab === tab ? colors.bgCard : 'transparent',
                    color: activeTab === tab ? colors.textMain : colors.textSecondary,
                    fontWeight: 'bold', cursor: 'pointer', transition: '0.2s'
                }}
            >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
        ))}
    </div>
);