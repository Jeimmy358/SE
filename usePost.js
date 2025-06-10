import { useState, useEffect, useCallback } from "react";
import {
	obtenerPostsPorEstacion,
	obtenerPostPorId,
	crearPost,
	editarPost,
	eliminarPost,
} from "../services/postService";
import { useAuth } from "./UseAuth";

export const usePosts = (estacionId) => {
	const { token } = useAuth();
	const [posts, setPosts] = useState([]);
	const [postActual, setPostActual] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const cargarPosts = useCallback(async () => {
		if (!estacionId) return;
		setLoading(true);
		try {
			const data = await obtenerPostsPorEstacion(estacionId);
			setPosts(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [estacionId]);
	

	const obtenerPost = useCallback(
		async (postId) => {
			setLoading(true);
			try {
				const post = await obtenerPostPorId(estacionId, postId);
				setPostActual(post);
				return post;
			} catch (err) {
				setError(err.message);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[estacionId]
	);

	const crear = async (post) => {
		setLoading(true);
		try {
			const nuevo = await crearPost(estacionId, post, token);
			setPosts((prev) => [...prev, nuevo]);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const editar = async (postId, postActualizado) => {
		setLoading(true);
		try {
			const actualizado = await editarPost(estacionId, postId, postActualizado, token);
			setPosts((prev) =>
				prev.map((p) => (p.id === postId ? actualizado : p))
			);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const eliminar = async (postId) => {
		setLoading(true);
		try {
			await eliminarPost(estacionId, postId, token);
			setPosts((prev) => prev.filter((p) => p.id !== postId));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		cargarPosts();
	}, [cargarPosts]);

	return {
		posts,
		postActual,
		loading,
		error,
		obtenerPost,
		crear,
		editar,
		eliminar,
		cargarPosts,
	};
};
