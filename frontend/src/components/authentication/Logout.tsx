import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout(); // Call logout service
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
