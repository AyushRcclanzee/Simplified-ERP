import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD46ANJTay2pU62UH7_LSKsG5SGTnQpOmg",
  authDomain: "erp-2-1a9a9.firebaseapp.com",
  projectId: "erp-2-1a9a9",
  storageBucket: "erp-2-1a9a9.appspot.com",
  messagingSenderId: "79942722001",
  appId: "1:79942722001:web:91b9ee43ab545eb82940f0",
  measurementId: "G-BM9BKB3FDK"
}; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db

