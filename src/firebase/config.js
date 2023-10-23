import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
 
const firebaseConfig = {
    apiKey: "AIzaSyDVoz4Rp1mAO3IBmEGrC-WmBCfL-hHF7q8",
    authDomain: "ecommerce-5d1d0.firebaseapp.com",
    projectId: "ecommerce-5d1d0",
    storageBucket: "ecommerce-5d1d0.appspot.com",
    messagingSenderId: "28423629121",
    appId: "1:28423629121:web:782c085793dda88cc719c0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};