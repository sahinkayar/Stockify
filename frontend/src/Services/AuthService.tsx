import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import type { UserProfileToken } from "../Models/User";

const api = "http://localhost:5022/api";

export const LoginAPI = async (username: string, password: string) => {
  try {
    const response = await axios.post<UserProfileToken>(
      api + "/account/login",
      {
        userName: username,
        password: password,
      },
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const response = await axios.post<UserProfileToken>(
      api + "/account/register",
      {
        userName: username,
        password: password,
        email: email,
      },
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};
