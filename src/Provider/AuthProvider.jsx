import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { clearCookie, getToken } from "../api/auth";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  //store the user info
  const [user, setUser] = useState(null);
  //loading state
  const [loading, setLoading] = useState(true);

  //sign user using google
  const googleProvider = new GoogleAuthProvider();
  const socialLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login existing user;
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logOut The current User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //observing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        getToken(userInfo);
        setLoading(false);
      } else {
        clearCookie();
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  console.log(user);
  //passing the function
  const userInfo = {
    createUser,
    loading,
    user,
    loginUser,
    logOut,
    socialLogin,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
