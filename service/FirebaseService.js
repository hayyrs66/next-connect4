import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAD_284zTomjiKt7RaD7MWy0OH4qx1eseQ",
  authDomain: "connect4-258f8.firebaseapp.com",
  projectId: "connect4-258f8",
  storageBucket: "connect4-258f8.appspot.com",
  messagingSenderId: "910349089805",
  appId: "1:910349089805:web:7c10ecf55fa5c192e7a944",
  measurementId: "G-EZZE7PMS82"
};

export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const database = getFirestore(app);
