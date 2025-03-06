import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [Auth, setAuth] = useState({ isLoggedin: false });
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (id && token) {
      setAuth({ isLoggedin: true });
    }
    setisLoading(false);
  }, []);
  return { Auth, isLoading };
};

const PrivateRoutes = () => {
  const { Auth, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div
        className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  return Auth.isLoggedin == true ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
