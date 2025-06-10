import React from "react";
import { Link } from "react-router-dom";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaLocationArrow,
    FaQuestionCircle,
} from "react-icons/fa";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import "./Footer.css";

const Footer = () => {
    const { darkMode, colorBlind } = useAccessibility();

    let footerModeClass = "navbar-eco-light"; // Usamos las clases del navbar por defecto
    if (darkMode) {
        footerModeClass = "navbar-eco-dark";
    }

    // Podemos añadir una clase específica para el footer en modo daltónico si es necesario
    const footerColorBlindClass = colorBlind ? "footer-eco-colorblind" : "";

    return (
        <footer className={`footer-eco navbar-eco ${footerModeClass} ${footerColorBlindClass}`}>
            <div className="container">
                <div className="footer-content">
                    {/* FAQ a la izquierda */}
                    <div className="footer-left">
                        <Link to="/faq" className="footer-link faq-link">
                            <FaQuestionCircle className="faq-icon" />
                            Preguntas Frecuentes
                        </Link>
                    </div>

                    {/* Derechos reservados al centro */}
                    <div className="footer-center">
                        <p className="footer-text">
                            &copy; 2025 Universidad de los Llanos. Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Contacto a la derecha */}
                    <div className="footer-right">
                        <ul className="footer-contact">
                            <li>
                                <FaPhoneAlt />
                                <span>+123 456 789</span>
                            </li>
                            <li>
                                <FaEnvelope />
                                <span>contacto@senderoeco.com</span>
                            </li>
                            <li>
                                <FaLocationArrow />
                                <span>Sendero Ecológico, Universidad de los Llanos</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;