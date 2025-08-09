import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMHH7tdFm5EpZazWSe604_05UH_ljszGI",
  authDomain: "bitel-247cf.firebaseapp.com",
  projectId: "bitel-247cf",
  storageBucket: "bitel-247cf.appspot.com",
  messagingSenderId: "773176941580",
  appId: "1:773176941580:web:739f17fddfa421fd4b6229"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);