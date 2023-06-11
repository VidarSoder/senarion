import { doc, setDoc, getDocs, query, collection, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const generateCompositeId = (itemId, uid) => `${itemId}_${uid}`;

const saveReview = async (itemId, rating, owned, uid) => {
    try {
        await setDoc(doc(collection(db, 'reviews'), generateCompositeId(itemId, uid)), { itemId, rating, owned, uid }, { merge: true });
    } catch (error) {
        console.error('Failed to save review:', error);
        throw error;
    }
};

const deleteReview = async (itemId, uid) => {
    try {
        await deleteDoc(doc(db, 'reviews', generateCompositeId(itemId, uid)));
    } catch (error) {
        console.error('Failed to delete review:', error);
        throw error;
    }
};

const fetchReviews = async (itemId, uid) => {
    try {
        const reviews = [];
        (await getDocs(query(collection(db, 'reviews'), where('itemId', '==', itemId), where('uid', '==', uid))))
            .forEach(doc => reviews.push(doc.data()));
        return reviews;
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        throw error;
    }
};

const fetchAllReviews = async () => {
    try {
        const reviews = [];
        (await getDocs(collection(db, 'reviews'))).forEach(doc => reviews.push(doc.data()));
        return reviews;
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        throw error;
    }
};

export { saveReview, deleteReview, fetchReviews, fetchAllReviews };