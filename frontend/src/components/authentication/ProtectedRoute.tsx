import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  user_id: number;
  role: string;
}

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Redirect to login page if the user is not logged in or role is not allowed
  if (!token || !roles.includes(userRole || "")) {
    return <Navigate to="/login" />;
  }

  // Decode the token to check its expiry time
  const decodedToken: DecodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    // Token has expired
    //TODO: Currently the user will have to login every 1h
    // Implement token refreshing and change token time to 15m
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
