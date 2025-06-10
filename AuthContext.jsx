/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState(null);
	const [token, setToken] = useState(null); // ← Nuevo estado

	useEffect(() => {
		const storedToken = localStorage.getItem("jwtToken");
		if (storedToken) {
			try {
				const decoded = jwtDecode(storedToken);
				setToken(storedToken); // ← Asigna el token
				setIsAuthenticated(true);
				setUserRole(decoded.role);
			} catch (e) {
				console.error("Token inválido:", e);
				localStorage.removeItem("jwtToken");
			}
		}
	}, []);

	const login = (newToken) => {
		localStorage.setItem("jwtToken", newToken);
		const decoded = jwtDecode(newToken);
		setToken(newToken); // ← Asigna el nuevo token
		setIsAuthenticated(true);
		setUserRole(decoded.role);
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
		setToken(null); // ← Limpia el token
		setIsAuthenticated(false);
		setUserRole(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);

};

