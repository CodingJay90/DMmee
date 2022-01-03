import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
      <div>
        <Link to="/profile">Profile</Link>
        <button className="btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
