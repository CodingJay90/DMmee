import React, { useState } from "react";

const SelectedUserBlock = ({ attachments, user, setMessageFilterQuery }) => {
  const [attachementLength, setAttachementLength] = useState(6);
  console.log(attachments.length);
  return (
    <>
      <div className="user__summary-container">
        <div className="user__summary-search">
          <input
            tyope="text"
            placeholder="search message"
            onChange={(e) => setMessageFilterQuery(e.target.value)}
          />
        </div>
        <div className="user__summary-img">
          <img src={user.profilePic} />
          <div
            className={`user__summary-status ${
              user.isOnline
                ? "user__summary-status--online"
                : "user__summary-status--offline"
            }`}
          ></div>
        </div>
        <div className="user__summary-name">{user.name}</div>
        <div className="user__summary-work">{user.title}</div>
        <div className="user__summary-attachments">
          <div className="user__summary-attachments-group">
            {attachments.length
              ? attachments
                  .slice(0, attachementLength)
                  .map(({ mediaType, to }, index) => (
                    <div
                      key={index}
                      data-id={to}
                      className="user__summary-attachments-item"
                    >
                      {mediaType.includes("image")
                        ? "image"
                        : mediaType.includes("pdf")
                        ? "pdf"
                        : mediaType.includes("audio")
                        ? "mp3"
                        : mediaType.includes("mp4")
                        ? "video"
                        : "others"}
                    </div>
                  ))
              : null}
          </div>
          {attachments.length > 6 && attachementLength < attachments.length && (
            <div
              className="user__summary-attachments-item showMoreBtn"
              onClick={() => setAttachementLength(attachementLength + 4)}
            >
              Show More {attachments.length - attachementLength}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectedUserBlock;
