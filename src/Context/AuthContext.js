// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check token in cookies
  const checkToken = () => {
    const tokenExists = document.cookie.split("; ").some((c) =>
      c.startsWith("token=")
    );
    setIsLoggedIn(tokenExists);
  };

  useEffect(() => {
    checkToken();
  }, []);

  // Fetch full profile (optional)
  const fetchOne = async () => {
    try {
      setCheckUser(true);
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}user/loggedIn`,
        { withCredentials: true }
      );
      setUser(response.data.user || null);
      setIsLoggedIn(!!response.data.user);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  // Login function to update state immediately
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_PATH}user/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        fetchOne,
        login,
        logout,
        isLoggedIn,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
