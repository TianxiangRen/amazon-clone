import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { useStateValue } from "./components/StateProvider";
import { db, auth } from "./components/firebase";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { doc, getDoc, onSnapshot} from 'firebase/firestore';
import Registration from "./components/Register";


const promise = loadStripe("pk_test_51LZMbOCeP2bX1fgGAIsGEjaV4Noeuzghc2Hdss45xs181oCvNLvlj5xIhajFQAtuo0TGvv9sowz7rTfLExNU2quU007LlcZQZc");

function App() {
  const [{}, dispatch] = useStateValue();
  const getCloudBasket = (user) => {
    let newBasket = []
    onSnapshot(doc(db, 'users', user?.uid, 'basket', 'current_basket'), {
      next: (snapshot) => {
      newBasket = snapshot.data().basket
      console.log("Cloud basket is >>> ", newBasket)
      dispatch({
        type:"SET_BASKET",
        basket: newBasket
      })},
      error: (error) => alert(error)
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        console.log("THE USER IS >>> ", authUser);
        if (authUser && auth) {
          getCloudBasket(authUser);
          dispatch({
            type: "SET_USER",
            user: authUser,
          });
        } else {
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      });

  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/register"
            element={<Registration />}
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route 
            path="/payment"
            element={
              <>
                <Header/>
                <Elements stripe={promise}>
                  <Payment/>
                </Elements>
                
              </>
            }/>
          <Route 
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
          />
          <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
