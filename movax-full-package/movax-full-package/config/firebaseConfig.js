// config/firebaseConfig.js
//
// 1. Go to https://console.firebase.google.com -> Create project
// 2. In your project, go to Project Settings -> General -> "Your apps" -> Add app (Web)
// 3. Copy the config values below from the snippet Firebase gives you
// 4. Go to Build -> Authentication -> Get Started -> Sign-in method -> Enable "Email/Password"
//
// Install dependencies first (run in your project root, PowerShell):
//   npx expo install firebase
//   npx expo install @react-native-async-storage/async-storage

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

// initializeAuth with AsyncStorage persistence keeps the user logged in
// between app restarts (getAuth() alone does NOT persist on React Native).
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
