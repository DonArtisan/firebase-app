// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhE1RHqx5NGWkjbyyxOvIuEZ9HGI8aFMo",
  authDomain: "copy-paste-e35f3.firebaseapp.com",
  databaseURL: "https://copy-paste-e35f3-default-rtdb.firebaseio.com",
  projectId: "copy-paste-e35f3",
  storageBucket: "copy-paste-e35f3.appspot.com",
  messagingSenderId: "897339660356",
  appId: "1:897339660356:web:4c0ba2e1ee6b505b6bc411"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

export { app, db };