import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//HOC
import ProtectedRoute from "./components/authentication/ProtectedRoute";

//Page imports
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManagerPage from "./pages/ManagerPage";
import DriverPage from "./pages/DriverPage";
import ClientPage from "./pages/ClientPage";
import SignupPage from "./pages/SignupPage";

//Component imports
import Logout from "./components/authentication/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <ProtectedRoute role="driver">
              <DriverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute role="client">
              <ClientPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
