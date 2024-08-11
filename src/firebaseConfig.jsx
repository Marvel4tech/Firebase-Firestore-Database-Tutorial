import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5dFMIiPIaxJMClc3-9KiAo2WAZ80qwrI",
  authDomain: "fir-firestore-db-tutorial.firebaseapp.com",
  projectId: "fir-firestore-db-tutorial",
  storageBucket: "fir-firestore-db-tutorial.appspot.com",
  messagingSenderId: "718365445592",
  appId: "1:718365445592:web:51565e28cd3f6afccef6ad"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)