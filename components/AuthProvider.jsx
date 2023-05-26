import React, { useEffect, useState } from "react";
import { Auth, User } from "./auth";

const auth = new Auth(); // singleton

const redirectKey = "sign_in_redirect";

export const AuthContext = React.createContext(undefined);

AuthContext.displayName = "AuthContext";

function setRedirect(redirect) {
  window.localStorage.setItem(redirectKey, redirect);
}

function getRedirect() {
  return window.localStorage.getItem(redirectKey);
}

function clearRedirect() {
  return window.localStorage.removeItem(redirectKey);
}

export function useAuth() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [additionalRole, setAdditionRole] = useState(null);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  /*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
  useEffect(() => {
    auth.resolveUser(2000).onAuthStateChanged((user, additionalRole, error) => {
      if (user) {
        setUser(user);
        setAdditionRole(additionalRole);
        setError(null);
      } else {
        setUser(null);
        setAdditionRole(null);
        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, []);

  const value = {
    user,
    additionalRole,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
