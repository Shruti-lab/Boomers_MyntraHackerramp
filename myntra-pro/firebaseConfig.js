// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsaMtvZfccvCk8U47eqSzyk9RIBSsElnI",
    authDomain: "myntra-pro.firebaseapp.com",
    projectId: "myntra-pro",
    storageBucket: "myntra-pro.appspot.com",
    messagingSenderId: "794906800844",
    appId: "1:794906800844:web:b00e4b01d4657606ccc869",
    measurementId: "G-8ECBT1YJ15"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

export { auth, firestore };
