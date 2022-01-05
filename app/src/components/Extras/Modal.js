import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Motion.scss";

const Modal = ({ setFile, handleSendMsg, setText, imgPreview, fileType }) => {
  return (
    <div className={`popup ${imgPreview ? "is-active" : ""}`} id="popup-main">
      <div class="popup-overlay popup-button" data-target="#popup-main"></div>
      <div class="popup-inner">
        <div className="backdrop">
          <div className="backdrop__container">
            <div className="backdrop__image-container">
              {fileType.includes("image") ? (
                <img src={imgPreview} alt="preview picture" />
              ) : (
                <iframe src={imgPreview} width="100%" height="100%"></iframe>
              )}
            </div>
            <div className="backdrop__caption">
              <input
                type="text"
                placeholder="Add caption"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="backdrop__buttons">
              <button
                onClick={handleSendMsg}
                className="navbar__btn button button--pipaluk button--text-thick"
              >
                Send Attachment
              </button>
              <button
                onClick={() => setFile("")}
                className="navbar__btn button button--pipaluk button--text-thick"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <motion.div
    //   className="backdrop"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    // >
    //   <motion.div
    //     className="backdrop__container"
    //     initial={{ y: "-100vh" }}
    //     animate={{ y: 0 }}
    //   >
    //     <div className="backdrop__image-container">
    //       <motion.img
    //         src={img}
    //         alt="preview picture"
    //         // initial={{ y: "-100vh" }}
    //         // animate={{ y: 0 }}
    //       />
    //     </div>
    //     <div className="backdrop__caption">
    //       <input
    //         type="text"
    //         placeholder="Add caption"
    //         onChange={(e) => setText(e.target.value)}
    //       />
    //     </div>
    //     <div className="backdrop__buttons">
    //       <button
    //         onClick={handleSendMsg}
    //         className="navbar__btn button button--pipaluk button--text-thick"
    //       >
    //         Send Attachment
    //       </button>
    //       <button
    //         onClick={() => setFile("")}
    //         className="navbar__btn button button--pipaluk button--text-thick"
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </motion.div>
    // </motion.div>
  );
};

export default Modal;
