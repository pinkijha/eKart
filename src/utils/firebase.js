// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1LFiZru0ZXneuxvFFv9_38zgysrKm38s",
  authDomain: "ekart-ba180.firebaseapp.com",
  projectId: "ekart-ba180",
  storageBucket: "ekart-ba180.firebasestorage.app",
  messagingSenderId: "679308648676",
  appId: "1:679308648676:web:a15c89fd73c7a1a6f34cf1",
  measurementId: "G-V6JKRHKE6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);