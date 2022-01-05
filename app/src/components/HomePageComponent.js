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
import Modal from "./Extras/Modal";
import SelectedUserBlock from "./SelectedUserBlock";
import SideBar from "./SideBar";

const HomePageComponent = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState("");
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatDetails, setChatDetails] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [messageFilterQuery, setMessageFilterQuery] = useState("");
  const [userFilterQuery, setUserFilterQuery] = useState("");

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
      setMessages(msgs);
      const filtered = msgs.filter((i) => i.media.length);
      console.log(filtered);
      setAttachments(filtered);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currUserId) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
    console.log(selectedUserId, "sdelectedUserid");
    console.log(attachments, "attachments");
  }
  async function handleSendMsg(e) {
    e.preventDefault();
    const selectedUserId = chatDetails.uid;
    const id =
      currUserId > selectedUserId
        ? `${currUserId + selectedUserId}`
        : `${selectedUserId + currUserId}`;
    let url;
    if (file) {
      const attachmentsRef = ref(
        storage,
        `attachments/${new Date().getTime()} - ${file.name}`
      );
      const snap = await uploadBytes(attachmentsRef, file);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: currUserId,
      to: selectedUserId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      mediaType: fileType || "",
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: currUserId,
      to: selectedUserId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      mediaType: fileType || "",
      unread: true,
    });
    setText("");
    setFile("");
  }

  function handleUploadChange(e) {
    setFileType(e.target.files[0].type);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const preview = URL.createObjectURL(e.target.files[0]);
      setImgPreview(preview);
      // URL.revokeObjectURL(preview);
    }
  }

  //Filter function
  const handleMessagesFilter = (messages) => {
    return messages.filter(
      (message) => message.text.toLowerCase().indexOf(messageFilterQuery) > -1
    );
  };
  const handleFriendsFilter = (users) => {
    return users.filter(
      (user) => user.name.toLowerCase().indexOf(userFilterQuery) > -1
    );
  };

  console.log(file);
  console.log(imgPreview);

  return (
    <>
      <div className="home__wrapper">
        <SideBar
          users={handleFriendsFilter(users)}
          currUserId={currUserId}
          selectUser={selectUser}
          messages={messages}
          chatDetails={chatDetails}
          setUserFilterQuery={setUserFilterQuery}
        />
        <div className="home__messages-container">
          <div className="home__messages-block">
            {chatDetails ? (
              <>
                <div className="home__messages-header">
                  <div className="home__messages-avatar">
                    <img
                      src={chatDetails.profilePic}
                      alt="avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="home__messages-header-name">
                    <p> {chatDetails.name}</p>
                    <div
                      className={`home__messages-header-status ${
                        chatDetails.isOnline
                          ? "home__messages-header-status--online"
                          : "home__messages-header-status--offline"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="home__chatbox">
                  <div className="home__chatBox-container">
                    {chatDetails ? (
                      <>
                        {messages.length ? (
                          handleMessagesFilter(messages).map((msg, i) => (
                            <Message
                              key={i}
                              message={msg}
                              currUserId={currUserId}
                              chatDetails={chatDetails}
                            />
                          ))
                        ) : (
                          <h1 className="displayMessage">
                            No Conversation with this user yet
                          </h1>
                        )}
                      </>
                    ) : (
                      <h1 className="displayMessage">
                        Select user to chat with
                      </h1>
                    )}
                  </div>
                </div>
                <Messanger
                  handleSendMsg={handleSendMsg}
                  handleUploadChange={handleUploadChange}
                  text={text}
                  setText={setText}
                  setImg={setImg}
                />
              </>
            ) : (
              <h1 className="displayMessage">Select A user to start a convo</h1>
            )}
          </div>
        </div>
        <div className="user__summary">
          {chatDetails && (
            <SelectedUserBlock
              setMessageFilterQuery={setMessageFilterQuery}
              attachments={attachments}
              user={chatDetails}
            />
          )}
        </div>
      </div>
      {file && imgPreview && (
        <Modal
          handleSendMsg={handleSendMsg}
          setFile={setFile}
          setText={setText}
          fileType={fileType}
          imgPreview={imgPreview}
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Alesso_profile.png/467px-Alesso_profile.png"
        />
      )}
    </>
  );
};

export default HomePageComponent;
