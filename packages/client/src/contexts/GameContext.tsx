import React, { useState, createContext } from 'react';
import { Card as GameCard } from '../../../shared/src/types/Card';

interface GameProviderProps {
    children: React.ReactNode;
}

export const GameContext = createContext({
    deck: [],
    setDeck: ([]) => {},
});

export const GameProvider = ({ children }: GameProviderProps) => {
    const [deck, setDeck] = useState<any>([]);

    return (
        <GameContext.Provider value={{ deck, setDeck }}>
            {children}
        </GameContext.Provider>
    );
};
