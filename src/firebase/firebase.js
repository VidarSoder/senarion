import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxhXK1K2AdBgAWimhIquSFxH3sd1XERpg",
    authDomain: "senarion-28243.firebaseapp.com",
    projectId: "senarion-28243",
    storageBucket: "senarion-28243.appspot.com",
    messagingSenderId: "466668238256",
    appId: "1:466668238256:web:708d8238f869bc2276d275",
    measurementId: "G-65BDP472TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
