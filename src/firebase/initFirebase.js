import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyA-NmIeD-S9GrHbxJwaJRJhlgGDtl61U5U",
    authDomain: "conectarte-3ed52.firebaseapp.com",
    projectId: "conectarte-3ed52",
    storageBucket: "conectarte-3ed52.appspot.com",
    messagingSenderId: "792600076862",
    appId: "1:792600076862:web:409ea72fc1e188c9f3276f",
    measurementId: "G-1GV9VBYM94"
};

const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp);