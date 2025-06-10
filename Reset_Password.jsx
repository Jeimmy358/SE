import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../config/config";
import { MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Reset_Password.css";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// Obtener el token de la query string de la URL
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get("token");

	// Expresión regular para validar contraseñas
	const passwordPattern =
		/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		if (!passwordPattern.test(password)) {
			setError(
				"La contraseña debe contener al menos una mayúscula, un número y un carácter especial."
			);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(
				`${API_URL}/auth/reset-password?token=${token}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ newPassword: password }),
				}
			);

			if (!response.ok) {
				throw new Error(
					"No se pudo restablecer la contraseña. Intenta nuevamente."
				);
			}

			setSuccess(
				"Contraseña restablecida correctamente. Ahora puedes iniciar sesión."
			);
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="reset-container">
			<h2>Restablecer Contraseña</h2>
			<form onSubmit={handleSubmit}>
				<div className="reset-form-group">
					<label htmlFor="password">Nueva contraseña</label>
					<div className="reset-input-icon">
						<MdLock className="reset-icon" />
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Nueva contraseña"
						/>
						<span
							className="eye-icon"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<AiFillEyeInvisible />
							) : (
								<AiFillEye />
							)}
						</span>
					</div>
				</div>

				<div className="reset-form-group">
					<label htmlFor="confirmPassword">
						Confirmar contraseña
					</label>
					<div className="reset-input-icon">
						<MdLock className="reset-icon" />
						<input
							type={showConfirmPassword ? "text" : "password"}
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="Confirma la contraseña"
						/>
						<span
							className="eye-icon"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
						>
							{showConfirmPassword ? (
								<AiFillEyeInvisible />
							) : (
								<AiFillEye />
							)}
						</span>
					</div>
				</div>

				{error && <div className="reset-error">{error}</div>}
				{success && <div className="reset-success">{success}</div>}

				<button type="submit" className="reset-btn" disabled={loading}>
					{loading ? "Restableciendo..." : "Restablecer contraseña"}
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
