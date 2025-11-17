import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* -------------------------
     Load user from localStorage on refresh
  -------------------------- */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("sereneCurrentUser"));
    const logged = localStorage.getItem("isLoggedIn") === "true";

    if (savedUser && logged) {
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  /* -------------------------
     SIGNUP
  -------------------------- */
  const signup = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      let users = JSON.parse(localStorage.getItem("sereneUsers")) || [];

      // Check if user exists
      if (users.some((u) => u.email === email)) {
        reject(new Error("User already exists with this email ❌"));
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      // Save user list
      users.push(newUser);
      localStorage.setItem("sereneUsers", JSON.stringify(users));

      // Remove password before saving logged-in state
      const safeUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };

      localStorage.setItem("sereneCurrentUser", JSON.stringify(safeUser));
      localStorage.setItem("isLoggedIn", "true");

      setCurrentUser(safeUser);
      setIsLoggedIn(true);

      resolve(safeUser);
    });
  };

  /* -------------------------
     LOGIN
  -------------------------- */
  const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem("sereneUsers")) || [];

      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        reject(new Error("Invalid email or password ❌"));
        return;
      }

      const safeUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        createdAt: found.createdAt,
      };

      localStorage.setItem("sereneCurrentUser", JSON.stringify(safeUser));
      localStorage.setItem("isLoggedIn", "true");

      setCurrentUser(safeUser);
      setIsLoggedIn(true);

      resolve(safeUser);
    });
  };

  /* -------------------------
     LOGOUT
  -------------------------- */
  const logout = () => {
    localStorage.removeItem("sereneCurrentUser");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
