import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyAHJ0zt4ADGHRIwoEyu5Q7Y7WX3kerI32U",
    authDomain: "book-5540f.firebaseapp.com",
    databaseURL: "https://book-5540f-default-rtdb.firebaseio.com",
    storageBucket: "book-5540f.appspot.com",
    projectId: "book-5540f",
    storageBucket: "book-5540f.appspot.com",
    messagingSenderId: "239238791318",
    appId: "1:239238791318:web:2c71276a8d19c5703e02b7"
}
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)