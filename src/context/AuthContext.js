import React, { useState, useEffect, createContext } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [uid, setUid] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                user.getIdToken().then(setToken);
                setUid(user.uid);
            }
        });
    }, []);

    const signUp = async ({ firstName, lastName, bio, email, password }) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', user.uid), { firstName, lastName, bio });
            setCurrentUser(user);
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signOutUser = () => signOut(auth).catch(console.error);

    if (loading) return <>Loading...</>;

    return (
        <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut: signOutUser, token, uid }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;