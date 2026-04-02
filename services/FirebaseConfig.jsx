import { initializeApp } from "firebase/app";
import { Platform } from "react-native";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "diet-planner-af9df.firebaseapp.com",
  projectId: "diet-planner-af9df",
  storageBucket: "diet-planner-af9df.firebasestorage.app",
  messagingSenderId: "850217206320",
  appId: "1:850217206320:web:1771e60be52feaa4f7e3f5",
  measurementId: "G-TFVR9PK60B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = Platform.OS == "web" ? getAuth(app) : initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});