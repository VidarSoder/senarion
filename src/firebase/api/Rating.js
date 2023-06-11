import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';

// This function fetches the average rating, the number of owners, and the average playtime for a game
export const fetchUserRatings = async (gameId) => {
    let averageRating = 0;
    let owners = 0;
    let averagePlaytime = 0;

    // Fetch all reviews for the game
    const reviewsRef = collection(db, 'reviews');
    const reviewQuery = query(reviewsRef, where('itemId', '==', gameId));
    const reviewSnapshot = await getDocs(reviewQuery);

    // Calculate average rating and number of owners
    if (!reviewSnapshot.empty) {
        let totalRating = 0;
        reviewSnapshot.forEach((doc) => {
            const review = doc.data();
            totalRating += review.rating;
            if (review.owned) {
                owners += 1;
            }
        });
        averageRating = Math.round(totalRating / reviewSnapshot.size);
    }

    // Fetch all playtimes for the game
    const playtimesRef = collection(db, 'playtime');
    const playtimeQuery = query(playtimesRef, where('itemId', '==', gameId));
    const playtimeSnapshot = await getDocs(playtimeQuery);

    // Calculate average playtime
    if (!playtimeSnapshot.empty) {
        let totalPlaytime = 0;
        playtimeSnapshot.forEach((doc) => {
            const playtime = doc.data();
            totalPlaytime += parseInt(playtime.playtime, 10);
        });
        averagePlaytime = totalPlaytime / playtimeSnapshot.size;
    }

    return {
        averageRating,
        owners,
        averagePlaytime,
    };
};