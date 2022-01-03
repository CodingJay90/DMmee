import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import facebook from "../assets/images/facebook.svg";
import google from "../assets/images/google.svg";
import linkedin from "../assets/images/linkedin.svg";
import "./Auth.scss";
const AuthComponent = () => {
  const [login, setLogin] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="login">
      <div
        className={`login__colored-container ${
          login
            ? "login__colored-container--left"
            : "login__colored-container--right"
        }`}
      ></div>
      <div
        className={`login__welcome-back ${
          login
            ? "login__welcome-back--active"
            : "login__welcome-back--inactive"
        }`}
      >
        <div className="login__welcome-back__logo-container">
          <img
            className="login__welcome-back__logo-container--image"
            src={logo}
            alt="Budwriter"
          />
          Budwriter
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
              setLogin(!login);
            }}
            className="login__welcome-back__main-container__button-container"
          >
            Sign In
          </div>
        </div>
      </div>
      <div
        className={`login__create-container ${
          login
            ? "login__create-container--active"
            : "login__create-container--inactive"
        }`}
      >
        Create Account
        <div className="login__create-container__social-container">
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
        </div>
        <span className="login__create-container--info-text">
          or use email for your registration
        </span>
        <div className="login__create-container__form-container">
          <form
            className="login__create-container__form-container__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="login__create-container__form-container__form--name"
              type="text"
              placeholder="Name"
              required
            />
            <input
              className="login__create-container__form-container__form--email"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password"
              required
            />
            <button className="login__create-container__form-container__form--submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className={`login__login-container ${
          !login
            ? "login__login-container--active"
            : "login__login-container--inactive"
        }`}
      >
        <div className="login__login-container__logo-container">
          <img
            className="login__login-container__logo-container--image"
            src={logo}
            alt="Budwriter"
          />
          Budwriter
        </div>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
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
          </div>
          <span className="login__login-container__main-container--info-text">
            or use email for your login
          </span>
          <div className="login__login-container__main-container__form-container">
            <form
              className="login__login-container__main-container__form-container__form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                placeholder="Email"
                value={signInForm.email}
                required
              />
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                placeholder="Password"
                value={signInForm.password}
                required
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
          !login
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
            setLogin(!login);
          }}
          className="login__welcome-back__main-container__button-container"
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
