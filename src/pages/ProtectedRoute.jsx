import { Navigate } from "react-router-dom";
import { useAuthentification } from "../contexts/AuthentificationContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthentification();

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
