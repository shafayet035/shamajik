import firebase from 'firebase'

const firebaseapp = firebase.initializeApp( {
    apiKey: "AIzaSyBdVZKpsQTkn0EjuTWyu1riSg7R53XUw60",
    authDomain: "instagram-webclone.firebaseapp.com",
    projectId: "instagram-webclone",
    storageBucket: "instagram-webclone.appspot.com",
    messagingSenderId: "838652527391",
    appId: "1:838652527391:web:e4a2c3d5526c97e122e62a",
    measurementId: "G-ZCEHFH5048"
})


const db = firebaseapp.firestore()
const auth = firebaseapp.auth()
const storage = firebaseapp.storage()

export {db, auth, storage} ;