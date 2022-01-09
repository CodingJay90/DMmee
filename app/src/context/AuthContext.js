import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { LoadingSpinner } from "../components/Extras/LoadingSpinner";
import { collection, doc, getDoc, query, where } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      console.log(authUser, "user");
      if (authUser) {
        const docRef = doc(db, "users", authUser?.uid);
        const docSnap = await getDoc(docRef);
        setCurrentUser(docSnap.data());
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <AuthContext.Provider value={{ user, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
