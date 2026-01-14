import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config (z Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC57vmOG6ztSZxESxThGuGlwyyMfEZIAZM",
  authDomain: "e-konfident-1d11f.firebaseapp.com",
  projectId: "e-konfident-1d11f",
  storageBucket: "e-konfident-1d11f.firebasestorage.app",
  messagingSenderId: "1045998608317",
  appId: "1:1045998608317:web:ae5dc02d04e4444b66fcd4",
};

// App (bez problemów przy hot-reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Eksporty do użycia w całej aplikacji
export const auth = getAuth(app);
export const db = getFirestore(app);
