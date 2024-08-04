import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../Components/firebase/firebaseConfig";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "../Components/firebase/auth";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { create, updateById } from "../helpers/userHelpers";
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
      // Create a new backend user
      const backendUser = await create({ firstName: "", lastName: "", email: "asdfasf12@gmail.com" });
      console.log("Backend user created successfully", backendUser);

      // Sign up with Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const firstName = result.user.displayName.split(' ')[0];
      const lastName = result.user.displayName.split(' ')[1];
      const email = result.user.email;
      const firebaseUid = result.user.uid;
      setUser(result.user);
      // Update the backend user with the Firebase UID
      await updateById(backendUser.id, { firstName, lastName, email, uid: firebaseUid });
      console.log('Google sign-in and user creation successful', result.user);
      navigate("/");
    } catch (error) {
      console.log('Error creating or updating backend user:', error);
      // If backend user creation fails, sign out the Firebase user
      await auth.signOut();
      throw error;
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
