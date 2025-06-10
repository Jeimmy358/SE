import React, { useState } from "react";
import {
	FaEdit,
	FaTrash,
	FaSave,
	FaCommentDots,
	FaTimes,
} from "react-icons/fa";
import ComentarioList from "../Comentarios/ComentarioList";
import { useComentarios } from "../../hooks/useComentario";
import { useAccessibility } from "../../hooks/useAccessibility";

const PostItem = ({
	post,
	isSelected,
	onSelect,
	onEditar,
	onEliminar,
	editandoPostId,
	setEditandoPostId,
	user,
	estacionId,
}) => {
	const { darkMode } = useAccessibility();

	const [postEditData, setPostEditData] = useState({
		titulo: post.titulo,
		contenido: post.contenido,
	});

	const iniciarEdicionPost = () => {
		setEditandoPostId(post.id);
		setPostEditData({ titulo: post.titulo, contenido: post.contenido });
	};

	const handleGuardarEdicion = async () => {
		await onEditar(post.id, postEditData);
	};

	const {
		comentarios,
		cargarComentarios,
		crear: crearComentario,
		editar: editarComentario,
		eliminar: eliminarComentario,
	} = useComentarios(estacionId, post.id);

	// Cargar comentarios cuando el post está seleccionado
	React.useEffect(() => {
		if (isSelected) cargarComentarios(estacionId, post.id);
	}, [isSelected, cargarComentarios, estacionId, post.id]);

	return (
		<div className={`post ${darkMode ? "dark-mode-post" : ""}`}>
			{editandoPostId === post.id ? (
				<>
					<input
						type="text"
						value={postEditData.titulo}
						onChange={(e) =>
							setPostEditData({
								...postEditData,
								titulo: e.target.value,
							})
						}
					/>
					<textarea
						value={postEditData.contenido}
						onChange={(e) =>
							setPostEditData({
								...postEditData,
								contenido: e.target.value,
							})
						}
					/>
					<button onClick={handleGuardarEdicion} title="Guardar">
						<FaSave />
					</button>
					<button
						onClick={() => setEditandoPostId(null)}
						title="Cancelar"
					>
						<FaTimes />
					</button>
				</>
			) : (
				<>
					<h3>{post.titulo}</h3>
					<p>{post.contenido}</p>
					<small>
						<b>{post?.autorNombre || "Desconocido"}</b> |{" "}
						{post.fechaCreacion
							? new Date(post.fechaCreacion).toLocaleString()
							: ""}
					</small>
					<div className="acciones">
						{(user?.email === post.usuario?.email ||
							user?.rol === "ADMIN") && (
							<>
								{user?.email === post.usuario?.email && (
									<button
										onClick={iniciarEdicionPost}
										title="Editar"
									>
										<FaEdit />
									</button>
								)}
								<button
									onClick={() => onEliminar(post.id)}
									title="Eliminar"
								>
									<FaTrash />
								</button>
							</>
						)}
						<button onClick={onSelect} title="Ver Comentarios">
							<FaCommentDots /> {isSelected ? "Ocultar" : "Ver"}{" "}
							comentarios
						</button>
					</div>
				</>
			)}

			{isSelected && (
				<ComentarioList
					comentarios={comentarios}
					crearComentario={crearComentario}
					editarComentario={editarComentario}
					eliminarComentario={eliminarComentario}
					postId={post.id}
					user={user}
					estacionId={estacionId}
				/>
			)}
		</div>
	);
};

export default PostItem;
