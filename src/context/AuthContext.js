import React, { useEffect, useState, createContext } from 'react';
import { auth } from '../firebase/firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

export const AuthContext = createContext();

const db = getFirestore();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [token, setToken] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        if (currentUser) {
            getAuth().currentUser.getIdToken().then((token) => {
                setToken(token);
            });
            setUid(currentUser.uid);
        }
    }, [currentUser]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    const signUp = async (firstName, lastName, bio, email, password) => {
        let user;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    bio: bio,
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });

        setCurrentUser(user);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setCurrentUser(null);
            })
            .catch((error) => {
                console.error('Sign-out error:', error);
            });
    };

    if (pending) {
        return <>Loading...</>;
    }

    return (
        <AuthContext.Provider value={{ currentUser, signOut: signOutUser, signUp, login, token, uid }}>
            {children}
        </AuthContext.Provider>
    );
};
