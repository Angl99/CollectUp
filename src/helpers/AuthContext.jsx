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
      
      const firstName = result.user.displayName.split(' ')[0];
      const lastName = result.user.displayName.split(' ')[1];
      const email = result.user.email;

      // Create backend user first
      try {
        const backendUser = await create({ firstName, lastName, email });
        console.log("Backend user created successfully", backendUser);

        // Now update the Firebase user with the backend user's ID
        await result.user.updateProfile({
          uid: backendUser.id.toString() // Assuming the backend returns an 'id' field
        });

        setUser(result.user);
        console.log('Google sign-in and user creation successful', result.user);
        navigate("/");
      } catch (error) {
        console.log('Error creating backend user:', error);
        // If backend user creation fails, sign out the Firebase user
        await auth.signOut();
        throw error;
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
