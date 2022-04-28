import React, { useState, createContext, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const AuthContext = createContext({});
const AuthStore = ({ children }) => {
  const userLocal = localStorage.getItem("user");
  const [user, setUser] = useState(
    userLocal
      ? JSON.parse(userLocal)
      : {
          email: "",
          token: "",
        }
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const signIn = (email, password) => {
    setUser({
      email,
      token: uuid(),
    });
  };
  const logout = () => {
    setUser({
      email: "",
      token: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
