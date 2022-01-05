import React, { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import User from "./User";

const SideBar = ({
  setUserFilterQuery,
  users,
  currUserId,
  selectUser,
  chatDetails,
  messages,
}) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="home__container">
        <div className="home__currUser">
          <div className="home__currUser-block">
            <div className="home__currUser-avatar">
              <div className="home__currUser-avatar-block">
                <img src={currentUser.profilePic} />
              </div>
            </div>
            <div className="home__currUser-detail">
              <h5>{currentUser.name}</h5>
              <p>{currentUser.title}</p>
            </div>
            <div className="home__currUser-icon">
              <FiEdit2 />
            </div>
          </div>
        </div>
        <div className="home__users-container">
          <div className="home__users-search">
            <input
              type="text"
              onChange={(e) => setUserFilterQuery(e.target.value)}
              placeholder="Search friends"
            />
          </div>
          <div className="home__users-heading">CurrentUsers</div>
          {users.length ? (
            users.map((user) => (
              <User
                key={user.uid}
                currUserId={currUserId}
                user={user}
                selectUser={selectUser}
                chatDetails={chatDetails}
                messages={messages}
              />
            ))
          ) : (
            <h1 className="displayMessage">No friends yet</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
