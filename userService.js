import { API_URL } from "../config/config";

// Registrar nuevo usuario (no requiere autenticación)
export const registrarUsuario = async (usuario) => {
	const response = await fetch(`${API_URL}/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(usuario),
	});

	if (!response.ok) throw new Error("Error al registrar usuario");
	return await response.json();
};

// Obtener todos los usuarios (requiere rol ADMIN)
export const obtenerTodosLosUsuarios = async (token) => {
	const response = await fetch(`${API_URL}/users`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error("Error al obtener usuarios");
	return await response.json();
};

// Obtener un usuario por email (requiere estar autenticado)
export const obtenerUsuarioPorEmail = async (email, token) => {
	const response = await fetch(`${API_URL}/users/${email}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error("Usuario no encontrado");
	return await response.json();
};

// Cambiar el rol de un usuario (requiere rol ADMIN)
export const cambiarRolUsuario = async (email, nuevoRol, token) => {
	const response = await fetch(`${API_URL}/users/${email}/role?newRole=${nuevoRol}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error("No se pudo actualizar el rol del usuario");
	return await response.json();
};

// Obtener el usuario actual autenticado
export const obtenerUsuarioActual = async (token) => {
	const response = await fetch(`${API_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error("No se pudo obtener el usuario actual");
	return await response.json();
};
