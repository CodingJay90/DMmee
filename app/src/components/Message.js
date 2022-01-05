import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ message, currUserId, chatDetails }) => {
  const { mediaType, media, text, to } = message;
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`home__chatbox-message ${
        message.from === currUserId
          ? "home__chatbox-message--own"
          : "home__chatbox-message--friend"
      }`}
      ref={scrollRef}
    >
      <div className="home__chatbox-message-container">
        {/* <div className="home__chatbox-message-avatar">
          <img src={chatDetails.profilePic} alt="avatar" className="avatar" />
        </div> */}
        <div className="home__chatbox-message-text">
          {media && mediaType.includes("image") ? (
            <img src={media} alt={text} />
          ) : null}
          {message.media && mediaType.includes("image") ? (
            "image"
          ) : mediaType.includes("pdf") ? (
            <iframe src={media} width="100%" height="100%"></iframe>
          ) : mediaType.includes("audio") ? (
            <iframe src={media} width="100%" height="100%"></iframe>
          ) : mediaType.includes("mp4") ? (
            <iframe src={media} width="100%" height="100%"></iframe>
          ) : null}

          {message.text}
        </div>
      </div>
    </div>
  );
};
// <div
//   className={`message_wrapper ${
//     message.from === currentUserId ? "own" : ""
//   }`}
//   ref={scrollRef}
// >
//   <p className={message.from === currentUserId ? "me" : "friend"}>
//     {message.media ? <img src={message.media} alt={message.text} /> : null}
//     {message.text}
//     <br />
//     <small>
//       <Moment fromNow>{message.createdAt.toDate()}</Moment>
//     </small>
//   </p>
// </div>

export default Message;
