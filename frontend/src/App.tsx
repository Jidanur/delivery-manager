import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// HOC
import ProtectedRoute from "./components/authentication/ProtectedRoute";

// Page imports
import ClientPage from "./pages/ClientPage";
import DriverPage from "./pages/DriverPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManagerPage from "./pages/ManagerPage";
import SignupPage from "./pages/SignupPage";
import CreatePackagePage from "./pages/CreatePackagePage";

// Component imports
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
            <ProtectedRoute roles={["manager"]}>
              <ManagerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-package"
          element={
            <ProtectedRoute roles={["manager", "client"]}>
              <CreatePackagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <ProtectedRoute roles={["driver"]}>
              <DriverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute roles={["client"]}>
              <ClientPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
