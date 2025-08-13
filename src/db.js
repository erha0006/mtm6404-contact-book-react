// src/db.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA...yourActualApiKey...",
  authDomain: "contact-book-a3906.firebaseapp.com",
  projectId: "contact-book-a3906",
  storageBucket: "contact-book-a3906.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
