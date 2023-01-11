import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../services/firebase";

const PrivateRoutes = () => {
  const [user] = useAuthState(auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
