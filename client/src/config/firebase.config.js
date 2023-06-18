// /* eslint-disable no-undef */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEAGING_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDSOmqzCV9yd0iSTvRjgPOsTyewQcmB8Rw",
  authDomain: "food-delivery-app-e855f.firebaseapp.com",
  databaseURL: "https://food-delivery-app-e855f-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-e855f",
  storageBucket: "food-delivery-app-e855f.appspot.com",
  messagingSenderId: "908962720287",
  appId: "1:908962720287:web:c2a30618222d011ccec32a"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };



