import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEstaciones } from "../../hooks/useEstaciones";
import EstacionesMapa from "./EstacionesMap";
import { useAccessibility } from "../../hooks/useAccessibility";
import "./EstacionDetalle.css";
import PostComentarios from "../Post/Post";

const EstacionDetalle = () => {
	const { id } = useParams();
	const { obtenerPorId, estacionData, loading, error } = useEstaciones();
	const { fontSize, darkMode } = useAccessibility();

	useEffect(() => {
		if (id) {
			obtenerPorId(id);
		}
	}, [id, obtenerPorId]);

	if (loading) return <p>Cargando estación...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!estacionData) return <p>No se encontró la estación</p>;
    
	const containerStyle = {
		backgroundColor: darkMode ? "#222" : "#fff",
		color: darkMode ? "#eee" : "#222",
		fontSize: `${fontSize}px`,
		padding: "20px",
		borderRadius: "8px",
	};

	const titleStyle = {
		fontSize: `${fontSize * 1.4}px`,
		color: darkMode ? "#fff" : "#000",
		marginBottom: "12px",
	};

	const descriptionStyle = {
		fontSize: `${fontSize}px`,
		color: darkMode ? "#ddd" : "#444",
	};

	return (
		<div className="estacion-detalle-container" style={containerStyle}>
			{/* Imagen portada */}
			{estacionData.imagenDestacadaUrl && (
				<div className="estacion-portada">
					<img
						src={estacionData.imagenDestacadaUrl}
						alt={estacionData.titulo}
						style={{
							width: "100%",
							maxHeight: "400px",
							objectFit: "cover",
							borderRadius: "8px",
						}}
					/>
				</div>
			)}

			{/* Descripción larga */}
			<div
				className="estacion-descripcion-larga"
				style={{ marginTop: "20px" }}
			>
				<h2 style={titleStyle}>{estacionData.titulo}</h2>
				<p style={descriptionStyle}>{estacionData.descripcionLarga}</p>
			</div>

			{/* Carrusel de imágenes */}
			<div
				className="estacion-carrusel"
				style={{
					display: "flex",
					gap: "10px",
					marginTop: "20px",
					overflowX: "auto",
				}}
			>
				{estacionData.imagenesCarruselUrls &&
				estacionData.imagenesCarruselUrls.length > 0 ? (
					estacionData.imagenesCarruselUrls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`Carrusel imagen ${index + 1}`}
							style={{
								width: "300px",
								height: "200px",
								objectFit: "cover",
								borderRadius: "6px",
								flexShrink: 0,
							}}
						/>
					))
				) : (
					<p style={descriptionStyle}>
						No hay imágenes en el carrusel.
					</p>
				)}
			</div>

			{/* Mapa */}
			{estacionData.latitud && estacionData.longitud ? (
				<div style={{ marginTop: "30px" }}>
					<EstacionesMapa estacion={estacionData} />
				</div>
			) : (
				<p style={descriptionStyle}>Cargando mapa...</p>
			)}

			<PostComentarios estacionId={id}/>
		</div>
	);
};

export default EstacionDetalle;
