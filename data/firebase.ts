import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRCIRiuc83BglVoaIezlfkK9AxcE8XQsM",
  authDomain: "web2-lab2-security.firebaseapp.com",
  projectId: "web2-lab2-security",
  storageBucket: "web2-lab2-security.appspot.com",
  messagingSenderId: "662681122112",
  appId: "1:662681122112:web:f74cdfcf7000356e3176a5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
if (process.env.NODE_ENV === "development") {
  console.log("development mode");
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("connected to firestore emulator");
}
