import React, { createContext, useState, useEffect } from 'react';
import boardgamesData from './data/boardGames.json';

export const BoardGamesContext = createContext();

export const BoardGamesProvider = ({ children }) => {
    const [boardGames, setBoardGames] = useState([]);

    //Fetch boardgames, if it fails - Use localdata
    useEffect(() => {
        fetch("http://example.com/api/boardgames")
            .then(res => res.json())
            .then(
                (result) => {
                    setBoardGames(result);
                },
                (error) => {
                    console.log("Failed to fetch data from API, using local data instead.");
                    setBoardGames(boardgamesData);
                }
            )
    }, []);

    return (
        <BoardGamesContext.Provider value={{ boardGames }}>
            {children}
        </BoardGamesContext.Provider>
    );
};