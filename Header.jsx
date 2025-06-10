import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ← AÑADIDO useNavigate
import { Dropdown } from "react-bootstrap";
import { FaUser, FaWheelchair } from "react-icons/fa";
import logo from "../../assets/logo.png";

import { useAccessibility } from "../../contexts/AccessibilityContext";
import { useAuth } from "../../hooks/UseAuth"; 

import "./Header.css";

const Header = () => {
	const {
		increaseFontSize,
		decreaseFontSize,
		toggleDarkMode,
		toggleColorBlind,
		fontSize,
		darkMode,
		colorBlind,
	} = useAccessibility();

	const { isAuthenticated, userRole, logout } = useAuth();
	const navigate = useNavigate(); // ← INSTANCIADO

	const handleLogout = () => {
		logout();            // ← Limpia token y contexto
		navigate("/");       // ← Redirige al inicio
	};

	return (
		<nav
			className={`navbar navbar-expand-lg navbar-eco ${darkMode ? "navbar-eco-dark" : "navbar-eco-light"}`}
			style={{ fontSize: `${fontSize}px` }}
		>
			<div className="container-fluid">
				{/* Logo a la izquierda */}
				<Link className="navbar-brand" to="/">
					<img src={logo} alt="Logo" className="navbar-eco-logo" />
				</Link>

				{/* Botón colapsable en móvil */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Enlaces centrados */}
				<div className="collapse navbar-collapse justify-content-center" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/">Inicio</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/stations">Estaciones</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/species">Especies</Link>
						</li>
					</ul>
				</div>

				{/* Accesibilidad y Usuario a la derecha */}
				<div className="d-flex align-items-center me-2">
					{/* Accesibilidad */}
					<Dropdown align="end" className="me-2">
						<Dropdown.Toggle
							variant="success"
							id="dropdown-accessibility"
							style={{ backgroundColor: "#4CAF50", border: "none" }}
						>
							<FaWheelchair />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={increaseFontSize}>Aumentar fuente</Dropdown.Item>
							<Dropdown.Item onClick={decreaseFontSize}>Disminuir fuente</Dropdown.Item>
							<Dropdown.Item onClick={toggleDarkMode}>
								{darkMode ? "Modo claro" : "Modo oscuro"}
							</Dropdown.Item>
							<Dropdown.Item onClick={toggleColorBlind}>
								{colorBlind ? "Modo normal" : "Modo daltonismo"}
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					{/* Usuario */}
					<Dropdown align="end">
						<Dropdown.Toggle
							variant="success"
							id="dropdown-user"
							style={{ backgroundColor: "#4CAF50", border: "none" }}
						>
							<FaUser />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{isAuthenticated ? (
								<>
									<Dropdown.Item as={Link} to="/profile">
										Ir al perfil
									</Dropdown.Item>
									{userRole === "ADMIN" && (
										<Dropdown.Item as={Link} to="/admin">
											Ir al panel
										</Dropdown.Item>
									)}
									<Dropdown.Item onClick={handleLogout}>
										Cerrar sesión
									</Dropdown.Item>
								</>
							) : (
								<>
									<Dropdown.Item as={Link} to="/login">
										Iniciar sesión
									</Dropdown.Item>
									<Dropdown.Item as={Link} to="/register">
										Registrarse
									</Dropdown.Item>
								</>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		</nav>
	);
};

export default Header;
