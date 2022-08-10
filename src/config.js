import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCmjaL5eJ-a30F8HE-hRmcS6Nt758-PHmQ",
  authDomain: "e-commerce-app-710e9.firebaseapp.com",
  projectId: "e-commerce-app-710e9",
  storageBucket: "e-commerce-app-710e9.appspot.com",
  messagingSenderId: "568844942089",
  appId: "1:568844942089:web:7a188b9cfbe84a78c0b1d8",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
