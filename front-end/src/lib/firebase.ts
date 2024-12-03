import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdIfNu5GE41gyorgEq1h5VTV5x_HKe7O0",
  authDomain: "mood-bridge.firebaseapp.com",
  projectId: "mood-bridge",
  storageBucket: "mood-bridge.firebasestorage.app",
  messagingSenderId: "45347162331",
  appId: "1:45347162331:web:b2a4ae5aa246472c3564fe",
  measurementId: "G-WLJWNN7EWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, onAuthStateChanged };
