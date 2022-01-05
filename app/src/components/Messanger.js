import React from "react";
import { GrAttachment, GrSend } from "react-icons/gr";

const Messanger = ({ handleSendMsg, text, setText, setImg }) => {
  return (
    <div className="message__form">
      <div className="message__form-container">
        <form className="message__form-wrapper" onSubmit={handleSendMsg}>
          <label htmlFor="img">
            <GrAttachment />
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              id="img"
              accept="image/*"
              style={{ display: "none" }}
            />
          </label>
          <div className="message__form-input">
            <input
              type="text"
              placeholder="Enter message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button class="button button--shikoba button--text-medium button--round-l button--inverted">
            <i class="button__icon icon icon-camera"></i>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messanger;
