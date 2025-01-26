//HOC protected route to safeguard routing
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  user_id: number;
  role: string;
}

const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role: string;
}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  //redirect to login page if the user is not logged in
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  // Decode the token to check its expiry time
  const decodedToken: DecodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    // Token has expired
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
