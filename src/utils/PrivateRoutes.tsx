import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes: React.FC = () => {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user") || "");
  }
  return user?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};
