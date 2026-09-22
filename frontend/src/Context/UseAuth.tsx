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
  isLoading: boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      const res = await registerAPI(userName, password, email);

      if (res) {
        setIsLoading(true);
        localStorage.setItem("token", res.data.token);
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        setIsLoading(false);
        toast.success("login succes");
        navigate("/search");
      }
    } catch {
      toast.warning("Server error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (userName: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await LoginAPI(userName, password);
      if (response) {
        console.log(isLoading);
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
    } catch {
      toast.warning("Server error occured");
    } finally {
      setIsLoading(false);
    }
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
    }, 1200);
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
        isLoading,
      }}
    >
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
          <Spinner />
        </div>
      )}

      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
