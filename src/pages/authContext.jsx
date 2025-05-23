import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const validCredentials = {
    username: "resproriseedukasi",
    password: "layanankonselingbk2025",
  };

  const login = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          username === validCredentials.username &&
          password === validCredentials.password
        ) {
          setUser({ username });
          //   localStorage.setItem("isAuthenticated", "true");
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
