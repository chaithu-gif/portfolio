import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_LdYJ6BL1tBvYRF5jq9tMuKKjHmIrU1U",
  authDomain: "chaithanya-portfolio-58626.firebaseapp.com",
  projectId: "chaithanya-portfolio-58626",
  storageBucket: "chaithanya-portfolio-58626.firebasestorage.app",
  messagingSenderId: "346272745810",
  appId: "1:346272745810:web:ccde6d3d1bee079cf7128b",
  measurementId: "G-VNJF2F4JM2"
};

const app = initializeApp(firebaseConfig);
//database connection using firebase instance getFirestore and exporting it to be used in other files
export const db = getFirestore(app);