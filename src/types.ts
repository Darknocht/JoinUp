// types.ts

// Définition des sports disponibles dans l'application [cite: 35, 120, 179]
export type SportType = 'Padel' | 'Basketball' | 'Football' | 'Tennis' | 'Volleyball';

export interface Facility {
  id: string;
  name: string;
  sport: SportType;
  address: string;
  rating: number;
  pricePerHour: number;
  tags: string[];
  image: string;
}

export interface Session {
  id: string;
  clubName: string;
  sport: SportType;
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // [cite: 75, 83, 85]
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  description: string;
}

export interface ActivityEntry {
  id: string;
  sport: SportType;
  facilityName: string;
  date: string;
}

export interface UserProfile {
  name: string;
  initials: string; // [cite: 133, 210]
  level: number; // [cite: 134, 211]
  rating: number; // [cite: 135, 212]
  gamesPlayed: number; // [cite: 140, 216]
  sessionsJoined: number; // [cite: 145, 219]
  totalHours: number; // [cite: 148, 220]
  badgesCount: number; // [cite: 159, 232]
  progressToNextLevel: number; // Pourcentage (ex: 70%) [cite: 160, 234]
}