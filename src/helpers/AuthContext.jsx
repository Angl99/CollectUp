import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../Components/firebase/firebaseConfig";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "../Components/firebase/auth";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { create } from "../helpers/userHelpers";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const signup = async (email, password) => {
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('Google sign-in successful', result.user);
      console.log(result.user.displayName);
      console.log(result.user.email);
      console.log(result.user.uid);

      const firstName = result.user.displayName.split(' ')[0];
      const lastName = result.user.displayName.split(' ')[1];
      const email = result.user.email;
      const uid = result.user.uid;

      try {
        await create({ firstName, lastName, email, uid });
        console.log("User added successfully");
        navigate("/");
      } catch (error) {
        console.log('Error adding user:', error);
      }

    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await doSignInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await doSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    googleSignIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};