// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    'AIzaSyAtVcuZL_Ik2zR4pdPdcoyVKzac3uVAZGY',
  authDomain:
    'daily-moments-7bf3b.firebaseapp.com',
  projectId: 'daily-moments-7bf3b',
  storageBucket:
    'daily-moments-7bf3b.appspot.com',
  messagingSenderId: '414351875139',
  appId:
    '1:414351875139:web:f646050bdb5f31ae6748f6',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
