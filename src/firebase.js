// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDPLZwQlt7x4Q4WjkOhyMVAm2KAddaAp5w",
//     authDomain: "skinwiz-77514.firebaseapp.com",
//     projectId: "skinwiz-77514",
//     storageBucket: "skinwiz-77514.appspot.com",
//     messagingSenderId: "596080599413",
//     appId: "1:596080599413:web:6f5f7242935efec42a333c",
//     measurementId: "G-WG1M2CR3LY"
//   };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPLZwQlt7x4Q4WjkOhyMVAm2KAddaAp5w",
  authDomain: "skinwiz-77514.firebaseapp.com",
  projectId: "skinwiz-77514",
  storageBucket: "skinwiz-77514.appspot.com",
  messagingSenderId: "596080599413",
  appId: "1:596080599413:web:6f5f7242935efec42a333c",
  measurementId: "G-WG1M2CR3LY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);










