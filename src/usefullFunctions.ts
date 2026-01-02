import { useState, useEffect } from 'react';
import L from "leaflet";

export const useDarkMode = (): boolean => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (event: MediaQueryListEvent) => {
            setIsDark(event.matches);
        };
        query.addEventListener('change', handler);
        return () => query.removeEventListener('change', handler);
    }, []);

    return isDark;
};

// TRANSFORMER EN FONCTIONS
export const getColors = (isDarkMode: boolean) => ({
    bgPage: isDarkMode ? '#121212' : '#F9FAFB',
    bgCard: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    bgInput: isDarkMode ? '#2D2D2D' : '#F3F4F6',
    textMain: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#A0A0A0' : '#6B7280',
    border: isDarkMode ? '#333333' : '#F3F4F6',
    progressRail: isDarkMode ? '#333333' : '#F3F4F6',
    progressFill: isDarkMode ? '#FFFFFF' : '#111827',
});

export const getTheme = (isDarkMode: boolean) => ({
    bg: isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#F9FAFB]',
    card: isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    subText: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    input: isDarkMode ? 'bg-[#1E1E1E] text-white' : 'bg-[#F1F3F5] text-gray-700',
});

// Icônes Leaflet (Peuvent rester ainsi car elles n'appellent pas de Hooks)
export const createCustomIcon = (color: string) => L.divIcon({
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});