import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export const savePlaytime = async (itemId, playtime, userUid) => {
    try {
        await addDoc(collection(db, "playtime"), { itemId, playtime, uid: userUid, timeStamp: Date.now() });
    } catch (error) {
        console.error("Error adding playtime: ", error);
    }
};

export const fetchAllPlaytimes = async () => {
    try {
        const playtimes = [];
        (await getDocs(collection(db, 'playtime'))).forEach((doc) => {
            playtimes.push({ id: doc.id, ...doc.data() });
        });
        return playtimes;
    } catch (error) {
        console.error('Failed to fetch playtimes:', error);
        throw error;
    }
};

export const deletePlaytime = async (playtimeId) => {
    try {
        await deleteDoc(doc(db, "playtime", playtimeId));
        console.log("Playtime deleted with ID: ", playtimeId);
    } catch (error) {
        console.error("Error deleting playtime: ", error);
    }
};

export const fetchPlaytimes = async (itemId, userUid) => {
    try {
        const playtimes = [];
        (await getDocs(query(collection(db, 'playtime'), where('itemId', '==', itemId), where('uid', '==', userUid))))
            .forEach((doc) => {
                playtimes.push({ id: doc.id, ...doc.data() });
            });

        return playtimes;
    } catch (error) {
        console.error('Failed to fetch playtimes:', error);
        throw error;
    }
};