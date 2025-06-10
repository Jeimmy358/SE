// services/estacionService.js

import { API_URL } from "../config/config";

// GET público - lista de estaciones
export const obtenerEstaciones = async () => {
	const res = await fetch(`${API_URL}/estaciones`);
	if (!res.ok) throw new Error("Error al obtener estaciones");
	return await res.json();
};

// GET público - lista de estacion especifica
export const obtenerEstacionPorId = async (id) => {
	const res = await fetch(`${API_URL}/estaciones/${id}`)
	if (!res.ok) throw new Error("Error al obtener estación");
	
	return await res.json();
};

// POST - Crear estación (requiere token)
export const crearEstacion = async (formData, token) => {
	const res = await fetch(`${API_URL}/admin/estaciones`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData, // no se pone Content-Type para FormData
	});
	if (!res.ok) throw new Error("Error al crear estación");
	return await res.json();
};

// PUT - Actualizar estación (requiere token)
export const actualizarEstacion = async (id, formData, token) => {
	const res = await fetch(`${API_URL}/admin/estaciones/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});
	if (!res.ok) throw new Error("Error al actualizar estación");
	return await res.json();
};

// DELETE - Eliminar estación (requiere token)
export const eliminarEstacion = async (id, token) => {
	const res = await fetch(`${API_URL}/admin/estaciones/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Error al eliminar estación");
};

// DELETE - Eliminar imagen del carrusel (requiere token)
export const eliminarImagenCarrusel = async (id, indice, token) => {
	const res = await fetch(
		`${API_URL}/admin/estaciones/${id}/carrusel/${indice}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	if (!res.ok) throw new Error("Error al eliminar imagen del carrusel");
};
