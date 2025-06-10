import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { useUsers } from "../../hooks/useUsers"; // <-- importamos el hook
import "./Register.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nombre, setNombre] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { registrar, loading } = useUsers(); // <-- usamos la función del hook

	// Validaciones básicas (puedes moverlas al hook si prefieres)
	const isValidEmail = (email) =>
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
	const isValidPassword = (password) =>
		/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);
	const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);

		if (!isValidEmail(email)) {
			setError("Por favor, ingresa un correo electrónico válido.");
			return;
		}

		if (!isValidPassword(password)) {
			setError(
				"La contraseña debe tener una mayúscula, un número y un carácter especial."
			);
			return;
		}

		if (!isValidName(nombre)) {
			setError("El nombre no puede contener números.");
			return;
		}

		const result = await registrar({ nombre, email, password });

		if (result.success) {
			navigate("/login");
		} else {
			setError(result.message || "Error al registrar usuario.");
		}
	};

	return (
		<div className="register-container">
			<h2>Registrarse</h2>
			<form onSubmit={handleRegister}>
				<div className="form-group">
					<label htmlFor="name">Nombre</label>
					<div className="input-icon">
						<MdPerson className="icon" />
						<input
							type="text"
							id="name"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							required
							placeholder="Tu nombre completo"
						/>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="email">Correo electrónico</label>
					<div className="input-icon">
						<MdEmail className="icon" />
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="ejemplo@correo.com"
						/>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<div className="input-icon">
						<MdLock className="icon" />
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Crea una contraseña"
						/>
					</div>
				</div>

				{error && (
					<div className="error" role="alert">
						{error}
					</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="register-btn"
				>
					{loading ? "Cargando..." : "Registrarse"}
				</button>

				<div className="register-links">
					<button
						type="button"
						className="link-btn"
						onClick={() => navigate("/login")}
					>
						¿Ya tienes cuenta? Inicia sesión
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
