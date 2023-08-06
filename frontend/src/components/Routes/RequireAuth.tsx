import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: FC = () => {
  const { isAuthenticated } = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
