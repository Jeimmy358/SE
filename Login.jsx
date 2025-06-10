import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthService  } from "../../hooks/UseAuth"; // Importa el contexto de autenticación
import { useAccessibility } from "../../hooks/useAccessibility"; // Importa el hook de accesibilidad
import { MdEmail, MdLock } from "react-icons/md";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login: setAuthToken } = useAuth(); // Renombramos para evitar confusión con la función login del servicio
    const { login, loading, error } = useAuthService(); // Usamos el hook de servicio
    const { darkMode, colorBlind, largeFont, smallFont, highContrast, highContrastInverse, spacious, centerAlign } = useAccessibility();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await login(email, password);
            if (token) {
                setAuthToken(token); // Guardamos el token en el contexto de autenticación
                navigate("/");
            }
        } catch (err) {
            // El error ya se gestiona y se expone a través del hook useAuthService
            console.error("Error de inicio de sesión:", err);
        }
    };

    const containerClass = `login-container ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''} ${spacious ? 'spacious' : ''} ${centerAlign ? 'center-align' : ''}`;
    const labelClass = `login-label ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const inputClass = `login-input-icon input ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const buttonClass = `login-btn ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const errorClass = `error login-error ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const linkButtonClass = `link-btn ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;

    return (
        <div className={containerClass}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email" className={labelClass}>Correo electrónico</label>
                    <div className="input-icon">
                        <MdEmail className={"icon"} />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ejemplo@correo.com"
                            className={inputClass}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className={labelClass}>Contraseña</label>
                    <div className="input-icon">
                        <MdLock className={"icon"} />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Tu contraseña"
                            className={inputClass}
                        />
                    </div>
                </div>

                {error && <div className={errorClass} role="alert">{error}</div>}

                <button type="submit" disabled={loading} className={buttonClass}>
                    {loading ? "Cargando..." : "Iniciar sesión"}
                </button>

                <div className="login-links">
                    <button type="button" className={linkButtonClass} onClick={() => navigate("/forgot-password")}>
                        ¿Olvidaste tu contraseña?
                    </button>
                    <button type="button" className={linkButtonClass} onClick={() => navigate("/register")}>
                        ¿No tienes cuenta? Regístrate
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;