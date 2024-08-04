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
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      if (!result.user) {
        throw new Error('No user returned from Google sign-in');
      }
  
      const displayNameParts = result.user.displayName ? result.user.displayName.split(' ') : [];
      const firstName = displayNameParts[0] || "";
      const lastName = displayNameParts[1] || "";
      const email = result.user.email;
      const firebaseUid = result.user.uid;
  
      if (!email) {
        throw new Error('No email returned from Google sign-in');
      }
  
      // Create backend user after getting user details from Google
      const backendUser = await create({ firstName, lastName, email });
      console.log("Backend user created successfully", backendUser);
  
      // Adding a delay to ensure backend user creation is propagated
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
  
      // Update the backend user with the Firebase UID
      await updateById(backendUser.id, { uid: firebaseUid });
  
      // Set the user in the state and navigate
      setUser(result.user);
      console.log('Google sign-in and user creation successful', result.user);
      navigate("/");
    } catch (error) {
      console.log('Error during Google sign-in or backend user creation:', error);
  
      // If backend user creation fails, sign out the Firebase user
      if (auth.currentUser) {
        await auth.signOut();
      }
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
