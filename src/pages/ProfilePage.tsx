import React, { useState } from 'react';
import { useDarkMode } from "../usefullFunctions.ts";
import {Calendar, Clock, Medal, Trophy, Users} from "lucide-react";

// --- Données ---
const userData = {
  name: "Youssef Ahmed",
  initials: "YA",
  level: 12,
  rating: 4.6,
  gamesPlayed: 47,
  sessionsJoined: 28,
  totalHours: 94,
  badgesCount: 3,
  progressToNextLevel: 70,
  sports: ["Basketball", "Padel", "Football"]
};

const allActivities = [
  { id: '1', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 20, 2025' },
  { id: '2', sport: 'Padel', facilityName: 'Wrocław Padel Club', date: 'Oct 18, 2025' },
  { id: '3', sport: 'Football', facilityName: 'Stadion Olimpijski', date: 'Oct 15, 2025' },
  { id: '4', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 12, 2025' },
  { id: '5', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 7, 2025' },
  { id: '6', sport: 'Football', facilityName: 'Stadion Olimpijski', date: 'Oct 2, 2025' },
  { id: '7', sport: 'Padel', facilityName: 'Wrocław Padel Club', date: 'Sep 30, 2025' },
];

const badgesList = [
  { id: 'b1', name: 'Basketball', date: 'Jul 20, 2025' },
  { id: 'b2', name: 'Padel', date: 'Aug 30, 2025' },
  { id: 'b3', name: 'Football', date: 'Sep 1, 2025' },
];

export const ProfilePage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const [activeTab, setActiveTab] = useState<'statistics' | 'badges' | 'activity'>('statistics');

  const colors = {
    bgPage: isDarkMode ? '#121212' : '#F9FAFB',
    bgCard: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    bgInput: isDarkMode ? '#2D2D2D' : '#F3F4F6',
    textMain: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#A0A0A0' : '#6B7280',
    border: isDarkMode ? '#333333' : '#F3F4F6',
    progressRail: isDarkMode ? '#333333' : '#F3F4F6',
    progressFill: isDarkMode ? '#FFFFFF' : '#111827',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.bgCard,
    borderRadius: '24px',
    padding: '32px',
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
      <div style={{
        backgroundColor: colors.bgPage,
        margin: 0,
        padding: 0,
        color: colors.textMain,
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
      className="flex flex-col min-h-screen">
        <div style={{ width: '100%', margin: '0 auto' }} className="">

          {/* HEADER SECTION */}
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
                  {userData.sports.map(sport => (
                      <span key={sport} style={{ padding: '6px 16px', border: `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', color: colors.textSecondary, backgroundColor: colors.bgInput }}>
                    {sport}
                  </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STATS GRID - 100% Largeur */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px', width: '100%' }}>
            {[
              { label: 'Games Played', value: userData.gamesPlayed, color: '#F59E0B', icon: <Trophy/> },
              { label: 'Sessions Joined', value: userData.sessionsJoined, color: '#10B981', icon: <Users /> },
              { label: 'Hours Played', value: userData.totalHours, color: '#3B82F6', icon: <Clock /> },
              { label: 'Badges', value: userData.badgesCount, color: '#8B5CF6', icon: <Medal/> }
            ].map((stat, i) => (
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

          {/* TABS CONTROLLER */}
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

          {/* DYNAMIC CONTENT AREA */}
          <div style={cardStyle}>
            {activeTab === 'statistics' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px' }}>🏆 Activity Overview</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                          <span style={{ color: colors.textSecondary }}>Games Played</span>
                          <span style={{ fontWeight: 'bold' }}>{userData.gamesPlayed}</span>
                        </div>
                        <div style={{ height: '12px', backgroundColor: colors.progressRail, borderRadius: '6px', overflow: 'hidden' }}>
                          <div style={{ width: '47%', height: '100%', backgroundColor: colors.progressFill }}></div>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                          <span style={{ color: colors.textSecondary }}>Sessions Joined</span>
                          <span style={{ fontWeight: 'bold' }}>{userData.sessionsJoined}</span>
                        </div>
                        <div style={{ height: '12px', backgroundColor: colors.progressRail, borderRadius: '6px', overflow: 'hidden' }}>
                          <div style={{ width: '56%', height: '100%', backgroundColor: colors.progressFill }}></div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <div style={{ fontSize: '64px', fontWeight: '900' }}>{userData.totalHours}</div>
                        <div style={{ fontSize: '16px', color: colors.textSecondary }}>Total Hours Played</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {allActivities.slice(0, 5).map((activity) => (
                          <div key={activity.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: colors.bgInput, borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{fontSize: '18px', paddingTop: '8px', color: '#3B82F6'}}><Calendar/></span>
                              </div>
                              <div>
                                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{activity.sport}</p>
                                <p style={{ fontSize: '12px', color: colors.textSecondary, margin: 0 }}>{activity.facilityName}</p>
                              </div>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: colors.textSecondary }}>{activity.date}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}

            {activeTab === 'badges' && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>All badges</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    {badgesList.map(badge => (
                        <div key={badge.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', backgroundColor: colors.bgInput, borderRadius: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '28px', color: '#8B5CF6', paddingTop: '8px' }}><Medal/></span>
                            <span style={{ fontWeight: 'bold' }}>{badge.name}</span>
                          </div>
                          <span style={{ fontSize: '13px', color: colors.textSecondary }}>{badge.date}</span>
                        </div>
                    ))}
                  </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>All Activities</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '16px' }}>
                    {allActivities.map((activity) => (
                        <div key={activity.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: colors.bgInput, borderRadius: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{fontSize: '18px', paddingTop: '8px', color: '#3B82F6'}}><Calendar/></span>
                            </div>
                            <div>
                              <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{activity.sport}</p>
                              <p style={{ fontSize: '12px', color: colors.textSecondary, margin: 0 }}>{activity.facilityName}</p>
                            </div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: colors.textSecondary }}>{activity.date}</span>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};