// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase,ref } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfvJgnQPIArnUAotMbjA9vXSbvYz-6Gqc",
    authDomain: "java23-adv-js-scrum-board.firebaseapp.com",
    databaseURL: "https://java23-adv-js-scrum-board-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "java23-adv-js-scrum-board",
    storageBucket: "java23-adv-js-scrum-board.appspot.com",
    messagingSenderId: "213659241527",
    appId: "1:213659241527:web:52bb1dbbf9ff34da5e43b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref };


