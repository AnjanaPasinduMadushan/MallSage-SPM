// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo7JQ1qS7gVHQh09Kz8rhQmXQgVWvaNdc",
  authDomain: "uploadingspmbill.firebaseapp.com",
  projectId: "uploadingspmbill",
  storageBucket: "uploadingspmbill.appspot.com",
  messagingSenderId: "541016821117",
  appId: "1:541016821117:web:30b36f2dc2415239f9d014"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage};