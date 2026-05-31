import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 🔥 login function
  const login = (newToken) => {
    localStorage.setItem("token", newToken);

    setToken(newToken);
    setIsAuthenticated(true);
  };

  // 🔥 logout function
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);