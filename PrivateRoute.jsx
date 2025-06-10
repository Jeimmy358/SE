import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.js";

const PrivateRoute = ({ children, roleRequired }) => {
	const { isAuthenticated, userRole } = useAuth();

	if (!isAuthenticated) {
		// Si no está autenticado, redirige al login
		return <Navigate to="/login" />;
	}

	// Si se requiere un rol específico, verifica si el usuario tiene el rol adecuado
	if (roleRequired && userRole !== roleRequired) {
		// Si el rol no coincide, redirige al home o a una página de acceso denegado
		return <Navigate to="/" />;
	}

	return children;
};

export default PrivateRoute;
