import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_umkNjciiKgpDOJE8_2GU-LWD9lno6Kg",
  authDomain: "videostriming-9bbdd.firebaseapp.com",
  projectId: "videostriming-9bbdd",
  storageBucket: "videostriming-9bbdd.appspot.com",
  messagingSenderId: "118407841307",
  appId: "1:118407841307:web:11d6b9ece1ac65af525abe",
  measurementId: "G-RM4WX08HCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;