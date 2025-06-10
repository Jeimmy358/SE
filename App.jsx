import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AccessibilityProvider } from "./contexts/AccessibilityContext.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider} from "./contexts/AuthContext"; // Asegúrate de importar AuthProvider y useAuth
import { useAuth } from "./hooks/UseAuth.js"; 

function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Router>
          <HeaderWithAuth />
          <AppRoutes />
          <Footer />
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

// Componente que consume el contexto de autenticación
const HeaderWithAuth = () => {
  const { isAuthenticated, userRole } = useAuth(); // Consumiendo el contexto de autenticación
  return <Header isAuthenticated={isAuthenticated} userRole={userRole} />;
};

export default App;
