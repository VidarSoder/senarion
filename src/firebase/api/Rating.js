import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';

// Function to execute a Firestore query and return the documents
const fetchDocs = async (collectionName, itemId) => {
    const collectionRef = collection(db, collectionName);
    const dataQuery = query(collectionRef, where('itemId', '==', itemId));
    const dataSnapshot = await getDocs(dataQuery);
    return dataSnapshot.docs.map(doc => doc.data());
};

// Function to calculate an average from an array of numbers
const calculateAverage = (numbers) => {
    const total = numbers.reduce((sum, number) => sum + number, 0);
    const average = numbers.length ? total / numbers.length : 0;
    return parseFloat(average.toFixed(2));
};


// This function fetches the average rating, the number of owners, and the average playtime for a game
export const fetchUserRatings = async (gameId) => {
    const reviews = await fetchDocs('reviews', gameId);
    const playtimes = await fetchDocs('playtime', gameId);

    // Calculate average rating and number of owners
    const ratings = reviews.map(review => review.rating);
    const averageRating = calculateAverage(ratings);
    const owners = reviews.filter(review => review.owned).length;

    // Calculate average playtime
    const playtimesInNumbers = playtimes.map(playtime => parseInt(playtime.playtime, 10));
    const averagePlaytime = calculateAverage(playtimesInNumbers);

    return {
        averageRating,
        owners,
        averagePlaytime,
    };
};