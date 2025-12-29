import { useState, useEffect } from 'react';

export const useDarkMode = (): boolean => {
    // 1. On initialise l'état immédiatement en vérifiant le média
    // On utilise une fonction d'initialisation pour éviter de lire le DOM à chaque rendu
    const [isDark, setIsDark] = useState<boolean>(() => {
        // Vérification pour le Server Side Rendering (SSR)
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false; // Valeur par défaut côté serveur
    });

    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');

        // 2. On ne fait plus l'initialisation ici !
        // L'effet ne sert plus qu'à ÉCOUTER les changements futurs.

        const handler = (event: MediaQueryListEvent) => {
            setIsDark(event.matches);
        };

        query.addEventListener('change', handler);
        return () => query.removeEventListener('change', handler);
    }, []); // L'effet ne s'exécute qu'une fois au montage

    return isDark;
};