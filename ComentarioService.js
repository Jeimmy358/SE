import { API_URL } from "../config/config";

// Obtener comentarios de un post (GET público)
export const obtenerComentarios = async (estacionId, postId) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}/comentarios`);
	if (!res.ok) throw new Error("Error al obtener comentarios");
	return await res.json();
};

// Crear comentario (requiere autenticación)
export const crearComentario = async (estacionId, postId, comentarioData, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}/comentarios`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(comentarioData),
	});
	if (!res.ok) throw new Error("Error al crear comentario");
	return await res.json();
};

// Editar comentario (requiere autenticación)
export const editarComentario = async (estacionId, postId, comentarioId, comentarioData, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}/comentarios/${comentarioId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(comentarioData),
	});
	if (!res.ok) throw new Error("Error al editar comentario");
	return await res.json();
};

// Eliminar comentario (requiere autenticación)
export const eliminarComentario = async (estacionId, postId, comentarioId, token) => {
	const res = await fetch(`${API_URL}/estaciones/${estacionId}/posts/${postId}/comentarios/${comentarioId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Error al eliminar comentario");
};
