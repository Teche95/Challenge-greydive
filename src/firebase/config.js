// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk3cZRf0tr-RUPW5Mp11ZoJm-_jh4qIn4",
  authDomain: "dhallenge-greydive.firebaseapp.com",
  projectId: "dhallenge-greydive",
  storageBucket: "dhallenge-greydive.appspot.com",
  messagingSenderId: "735604291688",
  appId: "1:735604291688:web:0cb0fe1ccfb6bb59fca3dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app