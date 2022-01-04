import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import facebook from "../assets/images/facebook.svg";
import google from "../assets/images/google.svg";
import linkedin from "../assets/images/linkedin.svg";
import "./Auth.scss";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Notify from "./Extras/Notify";
import { LoadingSpinner } from "./Extras/LoadingSpinner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { name, email, password } = authForm;

  const handleChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  async function signUpLogic() {
    const colRef = collection(db, "users");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // await addDoc(colRef, {
    //   uid: result.user.uid,
    //   name,
    //   email,
    //   createdAt: Timestamp.fromDate(new Date()),
    //   isOnline: true,
    // });
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      name,
      email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
    });
    console.log(result);
  }
  async function signInLogic() {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    console.log(result.user.uid);
    const colRef = doc(db, "users", result.user.uid);
    await updateDoc(colRef, {
      isOnline: true,
    });
    console.log(result);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authForm.email || !authForm.password)
      return setError("email and password fields are required");
    setIsLoading(true);

    try {
      if (!isLogin) await signInLogic();
      if (isLogin) await signUpLogic();
      setIsLoading(false);
      setError(null);
      console.log(error, "hhh");
      if (!error) navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error, "here");
      setError(error.message);
    }
  }
  return (
    <div className="login">
      <div
        className={`login__colored-container ${
          isLogin
            ? "login__colored-container--left"
            : "login__colored-container--right"
        }`}
      ></div>
      <div
        className={`login__welcome-back ${
          isLogin
            ? "login__welcome-back--active"
            : "login__welcome-back--inactive"
        }`}
      >
        <div className="login__welcome-back__logo-container">
          <img
            className="login__welcome-back__logo-container--image"
            src={logo}
            alt="Dmmee logo"
          />
          Dmmee
        </div>
        <div className="login__welcome-back__main-container">
          <div className="login__welcome-back__main-container__text-container">
            <span className="login__welcome-back__main-container__text-container--title">
              Welcome Back!
            </span>
            <span className="login__welcome-back__main-container__text-container--secondary">
              To keep sharing your work with us, please log in.
            </span>
          </div>
          <div
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="login__welcome-back__main-container__button-container"
          >
            Sign In
          </div>
        </div>
      </div>
      <div
        className={`login__create-container ${
          isLogin
            ? "login__create-container--active"
            : "login__create-container--inactive"
        }`}
      >
        Create Account
        {/* <div className="login__create-container__social-container">
          <img
            className="login__create-container__social-container--facebook-icon"
            src={facebook}
            alt=""
          />
          <img
            className="login__create-container__social-container--google-icon"
            src={google}
            alt=""
          />
          <img
            className="login__create-container__social-container--linkedin-icon"
            src={linkedin}
            alt=""
          />
        </div> */}
        <span className="login__create-container--info-text">
          or use email for your registration
        </span>
        <div className="login__create-container__form-container">
          <form
            className="login__create-container__form-container__form"
            onSubmit={handleSubmit}
          >
            <input
              className="login__create-container__form-container__form--name"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              className="login__create-container__form-container__form--email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button className="login__create-container__form-container__form--submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className={`login__login-container ${
          !isLogin
            ? "login__login-container--active"
            : "login__login-container--inactive"
        }`}
      >
        <div className="login__login-container__logo-container">
          <img
            className="login__login-container__logo-container--image"
            src={logo}
            alt="Dmmee logo"
          />
          Dmmee
        </div>
        <div className="login__login-container__main-container">
          {/* <div className="login__login-container__main-container__social-container">
            <img
              className="login__login-container__main-container__social-container--facebook-icon"
              src={facebook}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--google-icon"
              src={google}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--linkedin-icon"
              src={linkedin}
              alt=""
            />
          </div> */}
          <span className="login__login-container__main-container--info-text">
            or use email for your login
          </span>
          <div className="login__login-container__main-container__form-container">
            <form
              className="login__login-container__main-container__form-container__form"
              onSubmit={handleSubmit}
            >
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button className="login__login-container__main-container__form-container__form--submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`login__hello-container ${
          !isLogin
            ? "login__hello-container--active"
            : "login__hello-container--inactive"
        }`}
      >
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">
            Hello, stranger!
          </span>
          <span className="login__welcome-back__main-container__text-container--secondary">
            Enter your personal details and start your own portfolio!
          </span>
        </div>
        <div
          onClick={() => {
            setIsLogin(!isLogin);
          }}
          className="login__welcome-back__main-container__button-container"
        >
          Sign Up
        </div>
      </div>
      {error && (
        <Notify
          heading="authentication error"
          message={error}
          type="error"
          isActive={error ? true : false}
        />
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default AuthComponent;
