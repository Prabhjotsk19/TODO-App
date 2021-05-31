import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCMXoms2qWWG743ntxX2ZHOMOE8KgV_vWA",
  authDomain: "todo-react-app-3c609.firebaseapp.com",
  projectId: "todo-react-app-3c609",
  storageBucket: "todo-react-app-3c609.appspot.com",
  messagingSenderId: "541306119376",
  appId: "1:541306119376:web:eed85b09cd70e633582ad5",
  measurementId: "G-H90HP1YED0"
});

const db = firebaseApp.firestore();

export default db ;

