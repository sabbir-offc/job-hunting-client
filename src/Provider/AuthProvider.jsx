import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  //store the user info
  const [user, setUser] = useState(null);
  //loading state
  const [loading, setLoading] = useState(true);

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

  //observing the current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      return unSubscribe();
    };
  }, []);
  console.log(user);
  //passing the function
  const userInfo = { createUser, loading, user, loginUser };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
