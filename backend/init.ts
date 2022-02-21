import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.firebase_api_key,
  authDomain: Constants?.manifest?.extra?.firebase_auth_domain,
  projectId: Constants?.manifest?.extra?.firebase_project_id,
  storageBucket: Constants?.manifest?.extra?.firebase_storage_bucket,
  messagingSenderId: Constants?.manifest?.extra?.firebase_messaging_sender,
  appId: Constants?.manifest?.extra?.firebase_app_id,
};

initializeApp(firebaseConfig);
