import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export const fetchAllUsers = async () => {
    const usersRef = collection(db, 'users');
    const userSnapshot = await getDocs(usersRef);

    const users = userSnapshot.docs.map(doc => doc.data());

    return users;
};