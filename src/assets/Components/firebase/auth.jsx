import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (auth, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doGoogleSignIn = (auth) => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = (auth) => {
  return signOut(auth);
};
