import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import {getFirestore, doc, setDoc, query, collection, onSnapshot } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_tudDP4lqVKG5DaP9GBKwCoL0_CeEBAs",
    authDomain: "clone-cca72.firebaseapp.com",
    projectId: "clone-cca72",
    storageBucket: "clone-cca72.appspot.com",
    messagingSenderId: "455623586541",
    appId: "1:455623586541:web:4d402d23f569304da552e4",
    measurementId: "G-1RB3DM72YS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const postOrderInfo = async (db, user, basket, paymentIntent) => {
  const orderRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);
  setDoc(orderRef, {
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  });
}

const updateCloudBasket = async (db, user, basket) => {
  const basketRef = doc(db, 'users', user?.uid, 'basket', 'current_basket');
  setDoc(basketRef, {
    basket: basket,
  })
}


export {db, auth, postOrderInfo, updateCloudBasket}
