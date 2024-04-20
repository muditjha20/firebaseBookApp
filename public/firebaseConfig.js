// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtuFpEDdfOT9qpP4dR6qZ3G7McBL75Cj8",
  authDomain: "leafy-link-56ac5.firebaseapp.com",
  projectId: "leafy-link-56ac5",
  storageBucket: "leafy-link-56ac5.appspot.com",
  messagingSenderId: "1061861045220",
  appId: "1:1061861045220:web:1f9929f33f903517630df1",
  measurementId: "G-01854GF56K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export default firebaseConfig;
export { db };