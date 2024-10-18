import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  //세션 요청 api
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/session", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // 사용자 정보 설정
        setIsLoggedin(true);
      } else {
        setUser(null);
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Failed to check session:", error);
      setUser(null);
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoggedin, setUser, setIsLoggedin, checkSession }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
