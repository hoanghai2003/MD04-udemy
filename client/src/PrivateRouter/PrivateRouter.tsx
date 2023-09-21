import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const UserLocal = JSON.parse(localStorage.getItem("user") || "null");

  if (UserLocal) {
    if (UserLocal.roles === 0) {
      return <Outlet />;
    } else if (UserLocal.roles === null) {
      return <Navigate to="/login" />;
    }
  }

  return <Navigate to="/login" />;
};

export default PrivateRouter;
