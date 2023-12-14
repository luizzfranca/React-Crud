import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  return signOut(auth);
}

export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
