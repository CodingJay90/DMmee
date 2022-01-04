import React from "react";
import "./Notify.scss";

const Notify = ({ heading, message, type, isActive }) => {
  return (
    <div className={isActive ? "notify notify--active" : "notify"}>
      <div className={`notify__container notify__container--${type}`}>
        <div className="notify__overlay">
          <h4>{heading}</h4>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notify;
