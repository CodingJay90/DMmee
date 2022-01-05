import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ message, currUserId, chatDetails }) => {
  console.log(message.from);
  console.log(currUserId);
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
    >
      <div className="home__chatbox-message-container">
        <div className="home__chatbox-message-avatar">
          <img
            src={
              chatDetails.avatar ||
              "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
            }
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="home__chatbox-message-text">
          {message.media ? (
            <img src={message.media} alt={message.text} />
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
