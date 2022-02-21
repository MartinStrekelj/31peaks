const { initializeApp } = require("firebase/app");
const firestore = require("firebase/firestore");

// TODO CHANGE TO LOCAL SETUP
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const data = require("./default.json");

const uploadDataScript = async () => {
  const db = firestore.getFirestore();
  const v = JSON.stringify(data);
  const { peaks } = JSON.parse(v);
  for (let index = 0; index < peaks.length; index++) {
    const peak = peaks[index];

    try {
      const docRef = await firestore.addDoc(
        firestore.collection(db, "peaks"),
        peak
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
};

uploadDataScript();
