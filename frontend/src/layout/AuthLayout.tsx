import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../reduxAuth_Slices/store";

const AuthLayout = () => {
  const location = useLocation();
  const isAuthenticated = useAppSelector((data) => data.user.isAuthenticated);
  const loading = useAppSelector((data) => data.loading.loadingPageReload);
  if (loading === true && isAuthenticated === false) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <h2 className="text-6xl font-semibold text-white">Loading....</h2>
      </div>
    );
  }
  if (loading === false && isAuthenticated === true) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  // return isAuthenticated ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={"/login"} state={{ from: location }} replace />
  // );
};

export default AuthLayout;
