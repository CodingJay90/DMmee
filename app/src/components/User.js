import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { TiTick } from "react-icons/ti";

const User = ({ user, currUserId, chatDetails, selectUser, messages }) => {
  const { name, profilePic, uid, isOnline } = user;
  const selectedUserId = uid;
  const [data, setData] = useState("");
  // console.log(data);

  useEffect(() => {
    const id =
      currUserId > selectedUserId
        ? `${currUserId + selectedUserId}`
        : `${selectedUserId + currUserId}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div className="home__users-block" onClick={() => selectUser(user)}>
        <div className="home__users-avatar">
          <div className="home__users-avatar-block">
            <img
              src={
                profilePic ||
                "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
              }
              alt="avatar"
              className="avatar"
            />
            <div
              className={`home__users-avatar-status ${
                isOnline
                  ? "home__users-avatar-status--online"
                  : "home__users-avatar-status--offline"
              }`}
            ></div>
          </div>
        </div>
        <div className="home__users-name">
          <h5>{name}</h5>
          <p>
            <strong>{data?.from === currUserId ? <TiTick /> : null}</strong>
            {data?.text?.length > 15
              ? data?.text.substring(0, 15) + "..."
              : data?.text}
          </p>
        </div>
        <div className="home__users-time">
          <p>10: 30am</p>
          {/* <span>1</span> */}
        </div>
      </div>
    </>
  );
};

{
  /* <div
        className={`user_wrapper ${
          chatDetails.name === user.name && "selected_user"
        }`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img
              src={
                avatar ||
                "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
              }
              alt="avatar"
              className="avatar"
            />
            <h4>{name}</h4>
            {data?.from !== currUserId && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === currUserId ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chatDetails.name === user.name && "selected_user"
        }`}
      >
        <img
          src={
            user.avatar ||
            "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
          }
          alt="avatar"
          className="avatar sm_screen"
        />
      </div> */
}

export default User;
