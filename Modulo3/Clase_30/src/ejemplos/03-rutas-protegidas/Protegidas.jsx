import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { styles } from "../../shared/styles";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export const Protegidas = () => {
  // El estado vive acá para compartirlo con Login, Dashboard y ProtectedRoute.
  // Se pierde al recargar la página (no hay persistencia).
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <nav style={styles.nav}>
        <Link to="/protegidas" style={styles.link}>
          Login
        </Link>
        <Link to="/protegidas/dashboard" style={styles.link}>
          Dashboard (privado)
        </Link>
      </nav>
      <p style={{ textAlign: "center" }}>
        Estado: {isAuthenticated ? "🔓 sesión iniciada" : "🔒 sin sesión"}
      </p>
      <Routes>
        <Route
          index
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
