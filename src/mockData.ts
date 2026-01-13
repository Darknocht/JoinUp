import type {Session} from "./types.ts";

export const mockSessions: Session[] = [
    {
        id: '1',
        sport: 'Padel',
        clubName: 'Wrocław Padel Club',
        level: 'Intermediate',
        date: '10/29/2025',
        time: '18:00',
        currentPlayers: 3,
        maxPlayers: 4,
        description: 'Looking for one more player for a friendly doubles match!',
        image: 'https://kluby.org/upload/kluby/871/zdjecia/1.jpg?v=1691683193',
        address: 'ul. Sportowa 12, Wrocław',
        rating: 4.8,
        pricePerHour: 80,
        tags: ['Parking', 'Showers', 'Equipment Rental', 'Outside and Inside']
    },
    {
        id: '2',
        sport: 'Basketball',
        clubName: 'Arena Basketball Center',
        level: 'Advanced',
        date: '10/30/2025',
        time: '20:00',
        currentPlayers: 8,
        maxPlayers: 10,
        description: 'Competitive 5v5 game. Must be able to play full court.',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
        address: 'ul. Sportowa 12, Wrocław',
        rating: 4.8,
        pricePerHour: 80,
        tags: ['Parking', 'Showers', 'Equipment Rental', 'Outside and Inside']
    },
    {
        id: '3',
        sport: 'Football',
        clubName: 'Stadion Olimpijski',
        level: 'Beginner',
        date: '10/29/2025',
        time: '19:00',
        currentPlayers: 14,
        maxPlayers: 22,
        description: 'Casual 11v11 match, everyone welcome!',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
        address: 'ul. Sportowa 12, Wrocław',
        rating: 4.8,
        pricePerHour: 80,
        tags: ['Parking', 'Showers', 'Equipment Rental', 'Outside and Inside']
    },
    {
        id: '4',
        sport: 'Volleyball',
        clubName: 'Beach Volleyball Arena',
        level: 'Intermediate',
        date: '10/31/2025',
        time: '17:00',
        currentPlayers: 5,
        maxPlayers: 8,
        description: 'Beach volleyball fun session. 4v4 rotating teams.',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
        address: 'ul. Sportowa 12, Wrocław',
        rating: 4.8,
        pricePerHour: 80,
        tags: ['Parking', 'Showers', 'Equipment Rental', 'Outside and Inside']
    }
];

export const mockMySessions: Session[] = [];

export const userData = {
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

export const allActivities = [
    { id: '1', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 20, 2025' },
    { id: '2', sport: 'Padel', facilityName: 'Wrocław Padel Club', date: 'Oct 18, 2025' },
    { id: '3', sport: 'Football', facilityName: 'Stadion Olimpijski', date: 'Oct 15, 2025' },
    { id: '4', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 12, 2025' },
    { id: '5', sport: 'Basketball', facilityName: 'Arena Basketball Center', date: 'Oct 7, 2025' },
    { id: '6', sport: 'Football', facilityName: 'Stadion Olimpijski', date: 'Oct 2, 2025' },
    { id: '7', sport: 'Padel', facilityName: 'Wrocław Padel Club', date: 'Sep 30, 2025' },
];

export const badgesList = [
    { id: 'b1', name: 'Basketball', date: 'Jul 20, 2025' },
    { id: 'b2', name: 'Padel', date: 'Aug 30, 2025' },
    { id: 'b3', name: 'Football', date: 'Sep 1, 2025' },
];

export const facilitiesData = [
    { id: '1', name: 'Wrocław Padel Club', sport: 'Padel', address: 'ul. Sportowa 12, Wrocław', rating: 4.8, pricePerHour: 80, tags: ['Parking', 'Showers', 'Equipment Rental', 'Outside and Inside'], image: 'https://kluby.org/upload/kluby/871/zdjecia/1.jpg?v=1691683193', position: [51.1079, 17.0385] as [number, number], isAvailable: true },
    { id: '2', name: 'Arena Basketball Center', sport: 'Basketball', address: 'ul. Grabiszyńska 45, Wrocław', rating: 4.6, pricePerHour: 60, tags: ['Indoor Court', 'Lockers', 'LED Lighting', 'Parking', 'Showers'], image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80', position: [51.0950, 17.0150] as [number, number], isAvailable: true },
    { id: '3', name: 'Stadion Olimpijski', sport: 'Football', address: 'ul. Paderewskiego 35, Wrocław', rating: 4.9, pricePerHour: 120, tags: ['Grass Field', 'Floodlights', 'Changing Rooms', 'Parking'], image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80', position: [51.1180, 17.0980] as [number, number], isAvailable: false }
];