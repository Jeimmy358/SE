import React, { useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
import "./Usuarios_Admin.css";

const Usuarios_Admin = () => {
	const {
		usuarios,
		loading,
		error,
		cargarUsuarios,
		cambiarRol,
		usuarioActual,
	} = useUsers();

	useEffect(() => {
		cargarUsuarios();
	}, [cargarUsuarios]);

	const handleToggleRole = (user) => {
		const nuevoRol = user.role === "ADMIN" ? "USER" : "ADMIN";
		cambiarRol(user.email, nuevoRol);
	};

	return (
		<div className="usuarios-admin-container">
			<h1>Gestión de Usuarios</h1>

			{loading && <p>Cargando usuarios...</p>}
			{error && <p className="error">{error}</p>}

			<table className="usuarios-table">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Email</th>
						<th>Rol</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((user) => (
						<tr key={user.email}>
							<td>{user.nombre}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								{/* Evitar que el admin cambie su propio rol */}
								{usuarioActual?.email === user.email ? (
									<span>Tu mismo</span>
								) : (
									<button
										onClick={() => handleToggleRole(user)}
										className="toggle-btn"
									>
										Cambiar a {user.role === "ADMIN" ? "USER" : "ADMIN"}
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Usuarios_Admin;
