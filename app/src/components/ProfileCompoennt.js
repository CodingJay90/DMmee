import React, { useEffect, useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage, db, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileCompoennt = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
    console.log(user);
    console.log(img);
  }, []);
  return (
    <>
      {user && (
        <div className="profile">
          <div className="profile__container">
            <div className="profile__img-container">
              <img
                src={
                  user.avatar ||
                  "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                }
                alt="avatar"
              />
              <div className="overlay">
                <div>
                  <label htmlFor="photo">{/* <Camera /> */}</label>
                  {/* {user.avatar ? <Delete deleteImage={deleteImage} /> : null} */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div className="text_container">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <hr />
              <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCompoennt;
