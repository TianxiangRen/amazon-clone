import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const returnLoginPage = () => {
    navigate("/login");
  };

  const register = (e) => {
    e.preventDefault();
    setEmailWarning("");
    setPasswordWarning("");
    if (password === confirmPassword) {
      if (password !== "") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((auth) => {
            // it successfully created a new user with email and password
            if (auth) {
              navigate("/", { replace: true });
            }
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                setEmailWarning("Email already in use, please try another one");
                break;

              case "auth/invalid-email":
                setEmailWarning("Invalid Email");
                break;

              case "auth/weak-password":
                setPasswordWarning("Password should be at least 6 characters");
                break;

              default:
                alert(error.message);
            }
          });
      } else {
        setPasswordWarning("Password cannot left empty");
      }
    } else {
      alert("Please double check your passwords.");
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          className="register__logo"
        />
      </Link>

      <div className="register__container">
        <h1>Sign Up</h1>

        <form>
          <div className="register__inputContainer">
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailWarning !== "" && (
              <small className="register__warning">❗{emailWarning}</small>
            )}
          </div>

          <div className="register__inputContainer">
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!(
              (passwordWarning === "Password cannot left empty" &&
                password?.length > 0) ||
              (passwordWarning === "Password should be at least 6 characters" &&
                password?.length >= 6) ||
              passwordWarning === ""
            ) && (
              <small className="register__warning">❗{passwordWarning}</small>
            )}
          </div>

          <div className="register__inputContainer">
            <h5>Confirm Password</h5>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && (
              <small className="register__warning">
                ❗Passwords does not match
              </small>
            )}
          </div>

          <button
            className="register__signinButton"
            onClick={register}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <button className="register__backButton" onClick={returnLoginPage}>
          Back to Login Page
        </button>
      </div>
    </div>
  );
};

export default Registration;
