
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBaasJTMgAODMXZpwA0enINa3I_8_aMj0g",
  authDomain: "notesapp-74694.firebaseapp.com",
  databaseURL: "https://notesapp-74694-default-rtdb.firebaseio.com",
  projectId: "notesapp-74694",
  storageBucket: "notesapp-74694.appspot.com",
  messagingSenderId: "46672680735",
  appId: "1:46672680735:web:92bd481de062080164822a"
};

const app = initializeApp(firebaseConfig);

export default app

