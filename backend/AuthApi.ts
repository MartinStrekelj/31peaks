import { getAuth, FacebookAuthProvider, signInWithCredential, User } from "firebase/auth";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();

export const facebookLoginAPI = async () => {
  const appId = Constants?.manifest?.extra?.facebook_app_id as string;
  console.log(appId);
  await Facebook.initializeAsync(appId);

  const fb = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  try {
    if (fb.type === "success") {
      const credentials = FacebookAuthProvider.credential(fb.token);
      const { user } = await signInWithCredential(auth, credentials);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserFromStorage = async () => {
  const value = await AsyncStorage.getItem("user");
  if (value !== null) {
    return JSON.parse(value) as User;
  }
  return null;
};

const userHasFirestoreInstance = async () => {};
