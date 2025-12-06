import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/Firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // CreateUser
  const CreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // LoginUser
  const SignInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // updateUser
  const UpdateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  // Obserber
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);
  // LogOut User
  const LogOutUser = () => {
    return signOut(auth);
  };
  const allInfo = {
    CreateUser,
    SignInUser,
    LogOutUser,
    user,
    loading,
    UpdateUser,
  };
  return <AuthContext value={allInfo}>{children}</AuthContext>;
};

export default AuthProvider;
