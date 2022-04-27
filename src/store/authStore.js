import React, { useState, createContext } from "react";
import { v4 as uuid } from "uuid";

export const AuthContext = createContext({});
const AuthStore = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    token: "",
  });
  const signIn = (email, password) => {
    setUser({
      email,
      token: uuid(),
    });
  };
  const signOut = () => {
    setUser({
      email: "",
      token: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
