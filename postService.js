import { API_URL } from "../config/config";

// Obtener todos los posts de una estación (GET público)
export const obtenerPostsPorEstacion = async (estacionId) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts`);
	if (!res.ok) throw new Error("Error al obtener posts");
	return await res.json();
};

// Obtener un post específico (GET público)
export const obtenerPostPorId = async (estacionId, postId) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}`);
	if (!res.ok) throw new Error("Error al obtener el post");
	return await res.json();
};

// Crear un nuevo post (requiere autenticación)
export const crearPost = async (estacionId, postData, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(postData),
	});
	if (!res.ok) throw new Error("Error al crear post");
	return await res.json();
};

// Editar un post (requiere autenticación)
export const editarPost = async (estacionId, postId, postData, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(postData),
	});
	if (!res.ok) throw new Error("Error al editar post");
	return await res.json();
};

// Eliminar un post (requiere autenticación)
export const eliminarPost = async (estacionId, postId, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Error al eliminar post");
};
