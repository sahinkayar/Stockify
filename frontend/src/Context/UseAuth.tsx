import React from "react";
import type { userProfile } from "../Models/User";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Components/Spinner/Spinner";

type userContextType = {
  user: userProfile | null;
  token: string | null;
  registeredUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isLoggingOut: boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registeredUser = async (
    userName: string,
    password: string,
    email: string,
  ) => {
    await registerAPI(userName, password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            userName: res.data.userName,
            email: res.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("login succes");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (userName: string, password: string) => {
    await LoginAPI(userName, password)
      .then((response) => {
        if (response) {
          const userObj = {
            userName: response?.data.userName,
            email: response?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          localStorage.setItem("token", response.data.token);
          setUser(userObj);
          setToken(response.data.token);
          toast.success("login succes");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    setIsLoggingOut(true);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setTimeout(() => {
      setUser(null);
      setToken("");
      setIsLoggingOut(false);

      navigate("/");
    }, 2000);
  };
  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registeredUser,
        isLoggingOut,
      }}
    >
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <Spinner />
        </div>
      )}

      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
