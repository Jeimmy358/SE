import { useState, useEffect, useCallback } from "react";
import {
	obtenerTodosLosUsuarios,
	obtenerUsuarioPorEmail,
	obtenerUsuarioActual,
	cambiarRolUsuario,
	registrarUsuario,
} from "../services/userService";
import { useAuth } from "./UseAuth";

export const useUsers = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [usuarioActual, setUsuarioActual] = useState(null);
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { token } = useAuth();

	const cargarUsuarios = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await obtenerTodosLosUsuarios(token);
			setUsuarios(data);
		} catch (err) {
			setError(err.message || "Error al cargar usuarios");
		} finally {
			setLoading(false);
		}
	}, [token]);

	const cargarUsuarioActual = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await obtenerUsuarioActual(token);
			setUsuarioActual(data);
		} catch (err) {
			setError(err.message || "Error al cargar usuario actual");
		} finally {
			setLoading(false);
		}
	}, [token]);

	const buscarPorEmail = useCallback(async (email) => {
		setLoading(true);
		setError(null);
		try {
			const data = await obtenerUsuarioPorEmail(email, token);
			setUsuarioSeleccionado(data);
			return data;
		} catch (err) {
			setError(err.message || "Error al buscar usuario por email");
			setUsuarioSeleccionado(null);
			return null;
		} finally {
			setLoading(false);
		}
	}, [token]);

	const cambiarRol = useCallback(async (email, nuevoRol) => {
		setLoading(true);
		setError(null);
		try {
			const actualizado = await cambiarRolUsuario(email, nuevoRol, token);
			setUsuarios((prev) =>
				prev.map((u) => (u.email === email ? actualizado : u))
			);
		} catch (err) {
			setError(err.message || "Error al cambiar el rol");
		} finally {
			setLoading(false);
		}
	}, [token]);

	const registrar = useCallback(async (usuario) => {
		setLoading(true);
		setError(null);
		try {
			const nuevo = await registrarUsuario(usuario);
			return nuevo;
		} catch (err) {
			setError(err.message || "Error al registrar usuario");
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (token) {
			cargarUsuarioActual();
		}
	}, [token, cargarUsuarioActual]);

	return {
		usuarios,
		usuarioActual,
		usuarioSeleccionado,
		loading,
		error,
		cargarUsuarios,
		cargarUsuarioActual,
		buscarPorEmail,
		cambiarRol,
		registrar,
	};
};
