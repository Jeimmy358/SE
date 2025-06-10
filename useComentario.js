import { useState, useEffect, useCallback } from "react";
import {
	obtenerComentarios,
	crearComentario,
	editarComentario,
	eliminarComentario,
} from "../services/ComentarioService";
import { useAuth } from "./UseAuth";

export const useComentarios = (estacionId, postId) => {
	const { token } = useAuth();
	const [comentarios, setComentarios] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const cargarComentarios = useCallback(async () => {
		if (!postId) return;
		setLoading(true);
		setError(null);
		try {
			const data = await obtenerComentarios(estacionId, postId);
			setComentarios(data);
		} catch (err) {
			setError(err.message || "Error al cargar comentarios");
		} finally {
			setLoading(false);
		}
	}, [estacionId, postId]);

	const crear = async (comentario) => {
		setLoading(true);
		setError(null);
		try {
			const nuevo = await crearComentario(estacionId, postId, comentario, token);
			setComentarios((prev) => [...prev, nuevo]);
		} catch (err) {
			setError(err.message || "Error al crear comentario");
		} finally {
			setLoading(false);
		}
	};

	const editar = async (comentarioId, nuevoContenido) => {
		setLoading(true);
		setError(null);
		try {
			const actualizado = await editarComentario(estacionId, postId, comentarioId, nuevoContenido, token);
			setComentarios((prev) =>
				prev.map((c) => (c.id === comentarioId ? actualizado : c))
			);
		} catch (err) {
			setError(err.message || "Error al editar comentario");
		} finally {
			setLoading(false);
		}
	};

	const eliminar = async (comentarioId) => {
		setLoading(true);
		setError(null);
		try {
			await eliminarComentario(estacionId, postId, comentarioId, token);
			setComentarios((prev) => prev.filter((c) => c.id !== comentarioId));
		} catch (err) {
			setError(err.message || "Error al eliminar comentario");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		cargarComentarios();
	}, [cargarComentarios]);

	return {
		comentarios,
		loading,
		error,
		cargarComentarios,
		crear,
		editar,
		eliminar,
	};
};
