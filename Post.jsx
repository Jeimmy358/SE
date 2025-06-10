import React, { useEffect, useState } from "react";
import { usePosts } from "../../hooks/usePost";
import { useAuth } from "../../hooks/UseAuth";
import { useAccessibility } from "../../hooks/useAccessibility";
import PostItem from "./PostItem";
import "./PostComentarios.css";
import {
	FaPlus
} from "react-icons/fa";

const PostComentarios = ({ estacionId }) => {
	const { user } = useAuth();
	const {
		darkMode,
		colorBlind,
		largeFont,
		smallFont,
		highContrast,
		highContrastInverse,
		spacious,
		centerAlign,
	} = useAccessibility();

	const {
		posts,
		cargarPosts,
		crear: crearPost,
		editar: editarPost,
		eliminar: eliminarPost,
	} = usePosts(estacionId);

	const [postSeleccionado, setPostSeleccionado] = useState(null);
	const [nuevoPost, setNuevoPost] = useState({ titulo: "", contenido: "" });
	const [editandoPostId, setEditandoPostId] = useState(null);

	useEffect(() => {
		if (estacionId) cargarPosts();
	}, [estacionId, cargarPosts]);

	const handleCrearPost = async () => {
		if (!nuevoPost.titulo.trim() || !nuevoPost.contenido.trim()) return;
		await crearPost(nuevoPost);
		setNuevoPost({ titulo: "", contenido: "" });
		await cargarPosts();
	};

	const handleEditarPost = async (id, datosEditados) => {
		await editarPost(id, datosEditados);
		setEditandoPostId(null);
		await cargarPosts();
	};

	const handleEliminarPost = async (id) => {
		await eliminarPost(id);
		if (postSeleccionado === id) setPostSeleccionado(null);
		await cargarPosts();
	};

	const containerClass = `post-comentarios-container ${
		darkMode ? "dark-mode" : ""
	} ${colorBlind ? "color-blind" : ""} ${largeFont ? "large-font" : ""} ${
		smallFont ? "small-font" : ""
	} ${highContrast ? "high-contrast" : ""} ${
		highContrastInverse ? "high-contrast-inverse" : ""
	} ${spacious ? "spacious" : ""} ${centerAlign ? "center-align" : ""}`;

	return (
		<div className={containerClass}>
			<h2>Publicaciones</h2>

			<div className="crear-post">
				<input
					type="text"
					placeholder="Título"
					value={nuevoPost.titulo}
					onChange={(e) =>
						setNuevoPost({ ...nuevoPost, titulo: e.target.value })
					}
				/>
				<textarea
					placeholder="Contenido"
					value={nuevoPost.contenido}
					onChange={(e) =>
						setNuevoPost({
							...nuevoPost,
							contenido: e.target.value,
						})
					}
				/>
				<button onClick={handleCrearPost}>
					<FaPlus /> Crear Post
				</button>
			</div>

			<div className="lista-posts">
				{posts.map((post) => (
					<PostItem
						key={post.id}
						post={post}
						isSelected={postSeleccionado === post.id}
						onSelect={() =>
							setPostSeleccionado(
								postSeleccionado === post.id ? null : post.id
							)
						}
						onEditar={handleEditarPost}
						onEliminar={handleEliminarPost}
						editandoPostId={editandoPostId}
						setEditandoPostId={setEditandoPostId}
						user={user}
						estacionId={estacionId}
					/>
				))}
			</div>
		</div>
	);
};

export default PostComentarios;
