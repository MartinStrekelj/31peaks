import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Optionally import the services that you want to use
//import {...} from "firebase/auth"; //

// Initialize Firebase, replace with env
const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.firebase_api_key,
  authDomain: Constants?.manifest?.extra?.firebase_auth_domain,
  projectId: Constants?.manifest?.extra?.firebase_project_id,
  storageBucket: Constants?.manifest?.extra?.firebase_storage_bucket,
  messagingSenderId: Constants?.manifest?.extra?.firebase_messaging_sender,
  appId: Constants?.manifest?.extra?.firebase_app_id,
};

console.log(firebaseConfig);

initializeApp(firebaseConfig);
getFirestore();
