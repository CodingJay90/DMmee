import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import Message from "./Message";
import Messanger from "./Messanger";
import User from "./User";
import { FiEdit2 } from "react-icons/fi";

const HomePageComponent = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatDetails, setChatDetails] = useState("");

  const currUserId = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [currUserId]));
    const unsub = onSnapshot(q, (snapShot) => {
      let users = [];
      snapShot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  async function selectUser(user) {
    /*TODO
        1) select the user to chat with and get all messages
        2)get last message b/w logged in user and selected user
        3)if last message exists and message is from selected user
        4)update last message doc, set unread to false
    */
    setChatDetails(user);
    const selectedUserId = user.uid;
    const id =
      currUserId > selectedUserId
        ? `${currUserId + selectedUserId}`
        : `${selectedUserId + currUserId}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (snapShot) => {
      let msgs = [];
      snapShot.forEach((doc) => {
        msgs.push(doc.data());
      });
      console.log(msgs, "messages");
      setMessages(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currUserId) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
    console.log(selectedUserId, "sdelectedUserid");
    console.log(id, "id");
  }
  async function handleSendMsg(e) {
    e.preventDefault();
    const selectedUserId = chatDetails.uid;
    const id =
      currUserId > selectedUserId
        ? `${currUserId + selectedUserId}`
        : `${selectedUserId + currUserId}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: currUserId,
      to: selectedUserId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: currUserId,
      to: selectedUserId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
    setText("");
    setImg("");
  }

  console.log(img);

  return (
    <>
      <div className="home__wrapper">
        <div className="home__container">
          <div className="home__currUser">
            <div className="home__currUser-block">
              <div className="home__currUser-avatar">
                <div className="home__currUser-avatar-block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png" />
                </div>
              </div>
              <div className="home__currUser-detail">
                <h5>David Graham</h5>
                <p>Senior Developer</p>
              </div>
              <div className="home__currUser-icon">
                <FiEdit2 />
              </div>
            </div>
          </div>
          <div className="home__users-container">
            <div className="home__users-search">
              <input type="text" placeholder="Search friends" />
            </div>
            <div className="home__users-heading">CurrentUsers</div>
            {users.map((user) => (
              <User
                key={user.uid}
                currUserId={currUserId}
                user={user}
                selectUser={selectUser}
                chatDetails={chatDetails}
                messages={messages}
              />
            ))}
          </div>
        </div>
        <div className="home__messages-container">
          <div className="home__messages-block">
            <div className="home__messages-header">
              <div className="home__messages-avatar">
                <img
                  src={
                    chatDetails.avatar ||
                    "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                  }
                  alt="avatar"
                  className="avatar"
                />
              </div>
              <div className="home__messages-header-name">
                {chatDetails.name}
              </div>
            </div>
            <div className="home__chatbox">
              <div className="home__chatBox-container">
                {chatDetails ? (
                  <>
                    {messages.length
                      ? messages.map((msg, i) => (
                          <Message
                            key={i}
                            message={msg}
                            currUserId={currUserId}
                            chatDetails={chatDetails}
                          />
                        ))
                      : null}
                  </>
                ) : (
                  <h1>Select user to chat with</h1>
                )}
              </div>
            </div>
            <Messanger
              handleSendMsg={handleSendMsg}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </div>
        </div>
        <div className="user__summary">
          <div className="user__summary-container">
            <div className="user__summary-search">
              <input tyope="text" placeholder="search message" />
            </div>
            <div className="user__summary-img">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png" />
            </div>
            <div className="user__summary-name">Jean Claude</div>
            <div className="user__summary-work">Junior Developer</div>
            <div className="user__summary-attachments">
              <div className="user__summary-attachments-group">
                <div>
                  https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png"
                </div>
                <div>
                  https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png"
                </div>
                <div>
                  https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageComponent;
