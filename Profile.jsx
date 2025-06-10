import React from "react";
import { useUsers } from "../../hooks/useUsers";
import {
	FaUserCircle,
	FaUserAstronaut,
	FaUserNinja,
	FaUserSecret,
	FaUserTie,
} from "react-icons/fa";

const iconosPerfil = [
	<FaUserCircle size={100} color="#4a90e2" />,
	<FaUserAstronaut size={100} color="#50e3c2" />,
	<FaUserNinja size={100} color="#9013fe" />,
	<FaUserSecret size={100} color="#f5a623" />,
	<FaUserTie size={100} color="#d0021b" />,
];

const Profile = () => {
	const { usuarioActual, loading, error } = useUsers();

	// Seleccionar icono aleatorio solo una vez por render
	const iconAleatorio = React.useMemo(() => {
		const index = Math.floor(Math.random() * iconosPerfil.length);
		return iconosPerfil[index];
	}, []);

	if (loading) return <p>Cargando perfil...</p>;
	if (error) return <p className="error">{error}</p>;
	if (!usuarioActual) return <p>No hay usuario autenticado.</p>;

	return (
		<div style={{ textAlign: "center", marginTop: 40 }}>
			<div>{iconAleatorio}</div>
			<h2>{usuarioActual.nombre}</h2>
			<p>{usuarioActual.email}</p>
		</div>
	);
};

export default Profile;
