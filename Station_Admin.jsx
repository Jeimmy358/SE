import React, { useState, useCallback } from "react";
import { useEstaciones } from "../../hooks/useEstaciones";
import TablaEstaciones from "../../components/Station_Admin/TablaEstaciones";
import FormularioEstaciones from "../../components/Station_Admin/FormularioEstaciones";

const Station_Admin = () => {
	const {
		estaciones,
		loading,
		error,
		obtenerPorId,
		crear,
		actualizar,
		eliminar: eliminarService, // Renombramos para evitar confusión
		eliminarImagen: eliminarImagenService,
	} = useEstaciones();

	const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);

	const handleEdit = async (estacion) => {
		const estacionCompleta = await obtenerPorId(estacion.id);
		if (estacionCompleta) {
			setEstacionSeleccionada(estacionCompleta);
		}
	};

	const handleCancelarEdicion = () => {
		setEstacionSeleccionada(null);
	};

	const handleActualizarEstacion = async (id, data) => {
		await actualizar(id, data);
		setEstacionSeleccionada(null);
	};

	const handleEliminarEstacion = async (id) => {
		try {
			await eliminarService(id);
			setEstacionSeleccionada(null); // Limpiamos la selección después de eliminar
		} catch (error) {
			console.error("Error al eliminar estación:", error);
			// Aquí podrías mostrar un mensaje de error al usuario
		}
	};

	const handleEliminarImagenCarrusel = useCallback(
		async (idEstacion, urlImagen) => {
			try {
				await eliminarImagenService(idEstacion, urlImagen);
				const estacionActualizada = await obtenerPorId(idEstacion);
				setEstacionSeleccionada(estacionActualizada);
			} catch (error) {
				console.error("Error al eliminar imagen:", error);
			}
		},
		[eliminarImagenService, obtenerPorId]
	);

	if (loading) return <p>Cargando estaciones...</p>;
	if (error) return <p>Error al cargar estaciones: {error}</p>;

	return (
		<div>
			<h2>Listado de Estaciones</h2>
			<TablaEstaciones data={estaciones} onEdit={handleEdit} />
			<h2 style={{ padding: "2em" }}>
				{estacionSeleccionada
					? "Editar Estación"
					: "Crear Nueva Estación"}
			</h2>

			<FormularioEstaciones
				estacionSeleccionada={estacionSeleccionada}
				onCrear={crear}
				onActualizar={handleActualizarEstacion}
				onEliminar={handleEliminarEstacion} // Pasamos nuestra función de eliminación
				onCancelarEdicion={handleCancelarEdicion}
				onEliminarImagenCarrusel={handleEliminarImagenCarrusel}
			/>
		</div>
	);
};

export default Station_Admin;
