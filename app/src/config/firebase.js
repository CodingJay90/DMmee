import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0N4x1KqQXT4zmvlG7l-0E0KYwXkR66CI",
  authDomain: "fir-9-simple-chatapp.firebaseapp.com",
  projectId: "fir-9-simple-chatapp",
  storageBucket: "fir-9-simple-chatapp.appspot.com",
  messagingSenderId: "192835849501",
  appId: "1:192835849501:web:7cc06fc0231407143f25f4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
