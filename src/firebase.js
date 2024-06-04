import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVm92bVg7hbfW5yIhkBvBp_RVaMHVioq4",
  authDomain: "reactwithfirebase-30b9e.firebaseapp.com",
  projectId: "reactwithfirebase-30b9e",
  storageBucket: "reactwithfirebase-30b9e.appspot.com",
  messagingSenderId: "1016126006289",
  appId: "1:1016126006289:web:4652cd2dc4bf55d7ecfdb0",
  measurementId: "G-TT04D1QM3L"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;