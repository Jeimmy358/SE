import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Stations from "../pages/Stations/Stations";
import Species from "../pages/Species/Species";
import Faq from "../pages/Faq/Faq";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Admin from "../layouts/Admin/Admin.jsx";
import Estacion from "../layouts/Estacion/Estacion.jsx";
import Profile from "../pages/Profile/Profile";
import Forgot_Password from "../pages/Forgot_Password/Forgot_Password";
import Reset_Password from "../pages/Reset_Password/Reset_Password";
import Station_Admin from "../pages/Station_Admin/Station_Admin.jsx";
import Usuarios_Admin from "../pages/Usuarios_Admin/Usuarios_Admin.jsx";
import PrivateRoute from "../components/PrivateRoute"; // Ruta privada

import { useAuth } from "../hooks/UseAuth.js";

const AppRoutes = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			{/* Rutas públicas */}
			<Route path="/" element={<Home />} />
			<Route path="/stations" element={<Stations />} />
			<Route path="/species" element={<Species />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/faq" element={<Faq />} />
			<Route path="/forgot-password" element={<Forgot_Password />} />
			<Route path="/reset-password" element={<Reset_Password />} />

			{/* Rutas privadas */}
			<Route
				path="/admin"
				element={
					<PrivateRoute isAuthenticated={isAuthenticated}>
						<Admin />
					</PrivateRoute>
				}
			>
				<Route path="estaciones" element={<Station_Admin />} />
				<Route path="usuarios" element={<Usuarios_Admin />} />
			</Route>
			<Route
				path="/profile"
				element={
					<PrivateRoute isAuthenticated={isAuthenticated}>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/estaciones/:id"
				element={
					<PrivateRoute isAuthenticated={isAuthenticated}>
						<Estacion />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
