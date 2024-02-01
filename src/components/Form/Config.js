import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcgqbGmDf6QFprcASqkT40CDgctCJEoJg",
  authDomain: "rsma-96aec.firebaseapp.com",
  projectId: "rsma-96aec",
  storageBucket: "rsma-96aec.appspot.com",
  messagingSenderId: "497785622878",
  appId: "1:497785622878:web:92233e78255d85420cbfcf",
  measurementId: "G-C0F8GM51YQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const imgDb = getStorage(app);

export { db, imgDb };
