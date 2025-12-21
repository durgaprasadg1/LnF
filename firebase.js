// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEaGxPhIqs1SO-VrIxEJ1FmRE9QewoRd4",
  authDomain: "landf-6ec2f.firebaseapp.com",
  projectId: "landf-6ec2f",
  storageBucket: "landf-6ec2f.firebasestorage.app",
  messagingSenderId: "719473611774",
  appId: "1:719473611774:web:9dfae7084f65a2bba026af",
  measurementId: "G-QS2FJWZ2MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);