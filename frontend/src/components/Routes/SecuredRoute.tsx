import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const SecuredRoute: FC = () => {
  const { isAuthenticated } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return isAuthenticated ? (
    <Navigate to={from} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default SecuredRoute;
