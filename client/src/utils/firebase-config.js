import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ3F-DAZOIPrmfKUM8bfKhUs1J89FEqEQ",
  authDomain: "netflix-clone-4b397.firebaseapp.com",
  projectId: "netflix-clone-4b397",
  storageBucket: "netflix-clone-4b397.appspot.com",
  messagingSenderId: "971326611115",
  appId: "1:971326611115:web:2e3bcfd192ea19877161ee",
  measurementId: "G-TBSZS5FSNL",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
