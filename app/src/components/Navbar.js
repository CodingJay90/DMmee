import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import navLogo from "../assets/images/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/register");
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/">
            <img src={navLogo} />
          </Link>
        </div>
        <div className="navbar__group square">
          {user ? (
            <>
              <Link className="navbar__links tenth before after" to="/profile">
                {user?.email}
              </Link>
              <button
                className="navbar__btn button button--pipaluk button--text-thick"
                onClick={logOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="navbar__links" to="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
