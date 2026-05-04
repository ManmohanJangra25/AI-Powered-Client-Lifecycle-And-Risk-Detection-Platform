import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/" />;

  // optional: wait for user load
  if (!user) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
