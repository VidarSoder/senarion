import React, { createContext, useState, useEffect } from 'react';
import { fetchAllReviews } from '../firebase/api/Reviews';
import { fetchAllPlaytimes } from '../firebase/api/Playtime';
import boardgamesData from './data/boardGames.json';

export const BoardGamesContext = createContext();

export const BoardGamesProvider = ({ children }) => {
    const [boardGames, setBoardGames] = useState([]);

    useEffect(() => {
        const API_ENDPOINT = "http://localhost:3002/api/boardgames";
        fetch(API_ENDPOINT)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('Failed to fetch data from the API, using local data instead.');
                    throw new Error('API request failed');
                }
            })
            .then((result) => {
                setBoardGames(result);
            })
            .catch((error) => {
                console.log(error);
                // Use local data instead
                setBoardGames(boardgamesData);
            });
    }, []);

    const groupByItemId = (data) => {
        return data.reduce((acc, cur) => {
            if (!acc[cur.itemId]) {
                acc[cur.itemId] = [];
            }
            acc[cur.itemId].push(cur);
            return acc;
        }, {});
    };

    const getAllCategories = () => {
        const allCategories = boardGames.flatMap(game => game.categories);
        return [...new Set(allCategories)];
    };

    const selectByCategory = (categories) => {
        setBoardGames(boardGames => boardGames.map(game => {
            const selected = categories.length === 0 || game.categories.some(category => categories.includes(category));
            return {
                ...game,
                selected,
            };
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const reviewsData = await fetchAllReviews();
            const ownersData = groupByItemId(reviewsData);

            const playtimesDataRaw = await fetchAllPlaytimes();
            const playtimesData = groupByItemId(playtimesDataRaw);

            setBoardGames(boardGames => boardGames.map(game => {
                const owners = ownersData[game.id]?.length || 0;
                const playtimes = playtimesData[game.id];
                let lastPlayed = null;
                if (playtimes) {
                    const timestamps = playtimes.map(playtime => playtime.timeStamp);

                    if (timestamps.length > 0) {
                        lastPlayed = Math.max(...timestamps);
                    }
                }
                return {
                    ...game,
                    owners,
                    lastPlayed
                };
            }));
        };

        fetchData();
    }, []);

    const sortByName = () => {
        setBoardGames(boardGames => [...boardGames].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const sortByReleaseDate = () => {
        setBoardGames(boardGames => [...boardGames].sort((a, b) => b.released - a.released));
    };

    const sortByOwners = () => {
        setBoardGames(boardGames => [...boardGames].sort((a, b) => b.owners - a.owners));
    };

    const sortByLatestPlayed = () => {
        setBoardGames(boardGames => [...boardGames].sort((a, b) => {
            if (a.lastPlayed === null && b.lastPlayed === null) return 0;
            if (a.lastPlayed === null) return 1;
            if (b.lastPlayed === null) return -1;
            return b.lastPlayed - a.lastPlayed;
        }));
    };

    return (
        <BoardGamesContext.Provider value={{ boardGames, setBoardGames, sortByName, sortByReleaseDate, sortByOwners, sortByLatestPlayed, getAllCategories, selectByCategory }}>
            {children}
        </BoardGamesContext.Provider>
    );
};
