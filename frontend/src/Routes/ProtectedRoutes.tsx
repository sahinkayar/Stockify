import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";
type Props = { children: React.ReactNode };

const ProtectedRoutes = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn() ? (
        <>{children} </>
      ) : (
        <Navigate to={"/login"} replace state={{ from: location }} />
      )}
    </div>
  );
};

export default ProtectedRoutes;
