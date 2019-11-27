import * as firebase from 'firebase';
import FirebaseConfig from '../config/firebaseConfig';

firebase.initializeApp(FirebaseConfig);
const db = firebase.database().ref()
const petsRef = db.child('pets');
const personsRef = db.child('persons');

export { petsRef, personsRef };