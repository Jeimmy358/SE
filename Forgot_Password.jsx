import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";
import { MdEmail} from "react-icons/md";
import "./Forgot_Password.css";
import { useAccessibility } from "../../hooks/useAccessibility"; // Importa el hook de accesibilidad

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { darkMode, colorBlind, largeFont, smallFont, highContrast, highContrastInverse, spacious, centerAlign } = useAccessibility();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.text();

            if (!response.ok) {
                throw new Error(result || "Error al enviar el correo");
            }

            setMessage(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const containerClass = `forgot-container ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''} ${spacious ? 'spacious' : ''} ${centerAlign ? 'center-align' : ''}`;
    const labelClass = `forgot-label ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const inputClass = `forgot-input ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const iconClass = `forgot-icon ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const buttonClass = `submit-btn ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const messageClass = `success ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const errorClass = `error ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const linkButtonClass = `link-btn ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${largeFont ? 'large-font' : ''} ${smallFont ? 'small-font' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const inputIconClass = `forgot-input-icon ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${highContrast ? 'high-contrast' : ''} ${highContrastInverse ? 'high-contrast-inverse' : ''}`;
    const formGroupClass = `forgot-form-group ${darkMode ? 'dark-mode' : ''} ${colorBlind ? 'color-blind' : ''} ${spacious ? 'spacious' : ''}`;

    return (
        <div className={containerClass}>
            <h2>¿Olvidaste tu contraseña?</h2>
            <form onSubmit={handleSubmit}>
                <div className={formGroupClass}>
                    <label className={labelClass} htmlFor="email">
                        Correo electrónico
                    </label>
                    <div className={inputIconClass}>
                        <MdEmail className={iconClass} />
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

                {message && <div className={messageClass}>{message}</div>}
                {error && <div className={errorClass}>{error}</div>}

                <button type="submit" disabled={loading} className={buttonClass}>
                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                </button>

                <div className="login-links">
                    <button
                        type="button"
                        className={linkButtonClass}
                        onClick={() => navigate("/login")}
                    >
                        Volver al inicio de sesión
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;