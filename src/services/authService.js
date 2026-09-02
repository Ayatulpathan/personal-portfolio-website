import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  isFirebaseConfigured
} from "../firebase/auth";
import { STORAGE_KEYS } from "../utils/constants";

export const authService = {
  // Listen to auth state changes
  subscribeToAuth(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, (user) => {
        callback(user);
      });
    } else {
      // Demo mock auth listener
      const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH_DEMO_USER);
      if (savedUser) {
        callback(JSON.parse(savedUser));
      } else {
        callback(null);
      }
      return () => {};
    }
  },

  // Login with email and password
  async login(email, password) {
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } else {
      // Demo mock login check
      if (email.trim().toLowerCase() === "admin@example.com" && password === "admin123") {
        const mockUser = {
          uid: "demo-admin-uid-123",
          email: "admin@example.com",
          displayName: "Portfolio Administrator",
          isDemo: true
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_DEMO_USER, JSON.stringify(mockUser));
        return mockUser;
      } else if (email && password.length >= 6) {
        // Accept any formatted login in local demo mode with notification
        const mockUser = {
          uid: "demo-admin-uid-" + Date.now(),
          email: email,
          displayName: email.split("@")[0],
          isDemo: true
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_DEMO_USER, JSON.stringify(mockUser));
        return mockUser;
      } else {
        throw new Error("Invalid email or password. Minimum password length is 6 characters.");
      }
    }
  },

  // Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_DEMO_USER);
    }
    return true;
  }
};
