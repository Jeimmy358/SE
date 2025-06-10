import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdLocationOn, MdPeople } from "react-icons/md";
import "./Admin.css";

const Admin = () => {
	return (
		<div className="admin-layout">
			<h1 className="admin-title">Panel de Administración</h1>

			<div className="admin-tabs">
				<NavLink
					to="/admin/estaciones"
					className={({ isActive }) => `admin-tab ${isActive ? "active" : ""}`}
				>
					<MdLocationOn className="admin-icon" />
					<span>Gestión de Estaciones</span>
				</NavLink>

				<NavLink
					to="/admin/usuarios"
					className={({ isActive }) => `admin-tab ${isActive ? "active" : ""}`}
				>
					<MdPeople className="admin-icon" />
					<span>Gestión de Usuarios</span>
				</NavLink>
			</div>

			<div className="admin-content">
				<Outlet />
			</div>
		</div>
	);
};

export default Admin;
