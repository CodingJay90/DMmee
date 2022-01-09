import React, { useEffect, useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage, db, auth } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FiCamera } from "react-icons/fi";

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
          `profilePictures/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            profilePic: url,
            profilePath: snap.ref.fullPath,
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
  }, [img]);
  return (
    <>
      {user && (
        <div class="profile wrapper">
          <div
            class="profile__wrapper profile"
            style={{ backgroundImage: `url(${user.profilePic})` }}
          >
            <div class="profile__overlay overlay">
              <div class="profile__details">
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
                <p>{user.title}</p>
              </div>
              <div class="profile__upload upload-icon">
                <div>
                  <label htmlFor="photo">
                    <FiCamera />
                    <input
                      type="file"
                      accept="image/*"
                      id="photo"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <div className="profile">
        //   <div className="profile__container">
        //     <div className="profile__img-container">
        //       <img src={user.profilePic} alt="avatar" />
        //       <div className="overlay">
        //         <div>
        //           <label htmlFor="photo">
        //             <FiCamera />
        //           </label>
        //           {/* {user.avatar ? <Delete deleteImage={deleteImage} /> : null} */}
        //           <input
        //             type="file"
        //             accept="image/*"
        //             style={{ display: "none" }}
        //             onChange={(e) => setImg(e.target.files[0])}
        //           />
        //         </div>
        //       </div>
        //     </div>
        //     <div className="text_container">
        //       <h3>{user.name}</h3>
        //       <p>{user.email}</p>
        //       <hr />
        //       <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default ProfileCompoennt;
