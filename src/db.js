// src/db.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "your_actual_api_key",
  authDomain: "contact-book-a3906.firebaseapp.com",
  projectId: "contact-book-a3906",
  storageBucket: "contact-book-a3906.appspot.com",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
