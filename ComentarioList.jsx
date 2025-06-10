import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import { useAccessibility } from "../../hooks/useAccessibility";
import { useComentarios } from "../../hooks/useComentario";
import { useAuth } from "../../hooks/UseAuth";
import "../Post/PostComentarios.css";

const ComentarioList = ({ postId, estacionId }) => {
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
	const { user } = useAuth();

	const {
		comentarios,
		crear,
		editar,
		eliminar,
		loading,
		error,
	} = useComentarios(estacionId, postId);

	const [nuevoComentario, setNuevoComentario] = useState("");
	const [editandoComentarioId, setEditandoComentarioId] = useState(null);
	const [comentEditData, setComentEditData] = useState("");

	const handleCrearComentario = async () => {
		if (!nuevoComentario.trim()) return;
		await crear({ contenido: nuevoComentario });
		setNuevoComentario("");
	};

	const handleGuardarEdicion = async (id) => {
		await editar(id, { contenido: comentEditData });
		setEditandoComentarioId(null);
	};

	const containerClass = `comentarios ${darkMode ? "dark-mode-comentarios" : ""} ${
		colorBlind ? "color-blind" : ""
	} ${largeFont ? "large-font" : ""} ${smallFont ? "small-font" : ""} ${
		highContrast ? "high-contrast" : ""
	} ${highContrastInverse ? "high-contrast-inverse" : ""} ${
		spacious ? "spacious" : ""
	} ${centerAlign ? "center-align" : ""}`;

	return (
		<div className={containerClass}>
			<h4>Comentarios</h4>

			{loading && <p>Cargando comentarios...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{comentarios.map((coment) => (
				<div key={coment.id} className="comentario">
					{editandoComentarioId === coment.id ? (
						<>
							<textarea
								value={comentEditData}
								onChange={(e) => setComentEditData(e.target.value)}
							/>
							<button onClick={() => handleGuardarEdicion(coment.id)} title="Guardar">
								<FaSave />
							</button>
							<button onClick={() => setEditandoComentarioId(null)} title="Cancelar">
								<FaTimes />
							</button>
						</>
					) : (
						<>
							<p>{coment.contenido}</p>
							<small>
								<b>{coment?.autorNombre || "Desconocido"}</b> |{" "}
								{coment.fechaComentario ? new Date(coment.fechaComentario).toLocaleString() : ""}
							</small>
							{(user?.email === coment.usuario?.email || user?.rol === "ADMIN") && (
								<div className="comentario-acciones">
									{user?.email === coment.usuario?.email && (
										<button
											onClick={() => {
												setEditandoComentarioId(coment.id);
												setComentEditData(coment.contenido);
											}}
											title="Editar"
										>
											<FaEdit />
										</button>
									)}
									<button
										onClick={() => eliminar(coment.id)}
										title="Eliminar"
									>
										<FaTrash />
									</button>
								</div>
							)}
						</>
					)}
				</div>
			))}

			<div className="crear-comentario">
				<textarea
					placeholder="Escribe un comentario..."
					value={nuevoComentario}
					onChange={(e) => setNuevoComentario(e.target.value)}
				/>
				<button onClick={handleCrearComentario} title="Comentar">
					<FaPlus /> Comentar
				</button>
			</div>
		</div>
	);
};

export default ComentarioList;
