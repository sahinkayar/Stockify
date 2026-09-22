import axios from "axios";
import { toast } from "react-toastify";
export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data)) {
      for (let val of err.data) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data === "object") {
      for (let e in err.data) {
        toast.warning(err.data.description[e][0]);
      }
    } else if (err?.data) {
      console.log(error.response);

      toast.warning(err.data);
    } else if (err?.status === 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    }
  }
};
