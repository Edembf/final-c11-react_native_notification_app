// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "XXXXX",
  authDomain: "XXXXX",
  projectId: "XXXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXXXXXXX",
  measurementId: "XXXXXXXXXX"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
