import React, { useState } from 'react';
import { Calendar, Medal } from "lucide-react";
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsGrid } from '../components/StatsGrid';
import { ProfileTabs } from '../components/ProfileTabs';
import {useDarkMode, getColors} from "../usefullFunctions.ts";
import {userData, badgesList, allActivities} from "../mockData.ts";

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'statistics' | 'badges' | 'activity'>('statistics');
  const isDarkMode = useDarkMode();
  const colors = getColors(isDarkMode);

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
      <div style={{ backgroundColor: colors.bgPage, color: colors.textMain, fontFamily: 'sans-serif', overflowX: 'hidden' }} className="flex flex-col min-h-screen p-6">
        <div style={{ width: '100%', margin: '0 auto' }}>

          <ProfileHeader userData={userData} colors={colors} cardStyle={cardStyle} />

          <StatsGrid userData={userData} colors={colors} cardStyle={cardStyle} />

          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} colors={colors} />

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