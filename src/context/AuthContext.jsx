import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { isFirebaseConfigured } from "../firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuth((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAdmin: Boolean(currentUser),
    isFirebaseConfigured,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
