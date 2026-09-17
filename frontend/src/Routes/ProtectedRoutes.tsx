import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";
import { toast } from "react-toastify";
type Props = { children: React.ReactNode };

const ProtectedRoutes = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn() ? (
        <>{children} </>
      ) : (
        <div>
          {toast.warning("You need to login first")}
          <Navigate to={"/login"} replace state={{ from: location }} />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoutes;
