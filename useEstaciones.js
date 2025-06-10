import { useCallback, useState, useEffect } from "react";
import {
	obtenerEstaciones,
	obtenerEstacionPorId,
	crearEstacion,
	actualizarEstacion,
	eliminarEstacion,
	eliminarImagenCarrusel,
} from "../services/estacionService";
import { useAuth } from "./UseAuth";

export const useEstaciones = () => {
	const [estaciones, setEstaciones] = useState([]);
	const [estacionData, setEstacionData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { token } = useAuth();

	const cargarEstaciones = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await obtenerEstaciones();
			setEstaciones(data);
		} catch (err) {
			setError(err.message || "Error al cargar estaciones");
		} finally {
			setLoading(false);
		}
	};

	const obtenerPorId = useCallback(async (id) => {
		setLoading(true);
		setError(null);
		try {
			const estacion = await obtenerEstacionPorId(id);
			setEstacionData(estacion); // <-- aquí actualizas el estado correcto
			return estacion;
		} catch (err) {
			setError(err.message || "Error al obtener estación");
			setEstacionData(null);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const crear = async (formData) => {
		setLoading(true);
		setError(null);
		try {
			const nueva = await crearEstacion(formData, token);
			setEstaciones((prev) => [...prev, nueva]);
		} catch (err) {
			setError(err.message || "Error al crear estación");
		} finally {
			setLoading(false);
		}
	};

	const actualizar = async (id, formData) => {
		setLoading(true);
		setError(null);
		try {
			const actualizada = await actualizarEstacion(id, formData, token);
			setEstaciones((prev) =>
				prev.map((est) => (est.id === id ? actualizada : est))
			);
		} catch (err) {
			setError(err.message || "Error al actualizar estación");
		} finally {
			setLoading(false);
		}
	};

	const eliminar = async (id) => {
		setLoading(true);
		setError(null);
		try {
			await eliminarEstacion(id, token);
			setEstaciones((prev) => prev.filter((est) => est.id !== id));
		} catch (err) {
			setError(err.message || "Error al eliminar estación");
		} finally {
			setLoading(false);
		}
	};

	const eliminarImagen = async (id, indice) => {
		setLoading(true);
		setError(null);
		try {
			await eliminarImagenCarrusel(id, indice, token);
			await obtenerEstacionPorId(id);
		} catch (err) {
			setError(err.message || "Error al eliminar imagen");
		} finally {
			setLoading(false);
		}
	};

	// Cargar estaciones automáticamente al montar
	useEffect(() => {
		cargarEstaciones();
	}, []);

	return {
		estaciones,
		estacionData,
		loading,
		error,
		cargarEstaciones,
		obtenerPorId,
		crear,
		actualizar,
		eliminar,
		eliminarImagen,
	};
};
