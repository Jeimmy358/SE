/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto
const AccessibilityContext = createContext();

// Crea el proveedor para el contexto
export const AccessibilityProvider = ({ children }) => {
	const [fontSize, setFontSize] = useState(16);
	const [darkMode, setDarkMode] = useState(false);
	const [colorBlind, setColorBlind] = useState(false);

	useEffect(() => {
		const savedFontSize = localStorage.getItem("fontSize");
		const savedDarkMode = localStorage.getItem("darkMode");
		const savedColorBlind = localStorage.getItem("colorBlind");

		if (savedFontSize) setFontSize(Number(savedFontSize));
		if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
		if (savedColorBlind) setColorBlind(JSON.parse(savedColorBlind));
	}, []);

	useEffect(() => {
		localStorage.setItem("fontSize", fontSize);
		localStorage.setItem("darkMode", darkMode);
		localStorage.setItem("colorBlind", colorBlind);

		document.body.style.fontSize = `${fontSize}px`;

		if (darkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}

		if (colorBlind) {
			document.body.classList.add("color-blind");
		} else {
			document.body.classList.remove("color-blind");
		}
	}, [fontSize, darkMode, colorBlind]);

	const increaseFontSize = () => setFontSize(fontSize + 2);
	const decreaseFontSize = () => setFontSize(fontSize - 2);
	const toggleDarkMode = () => setDarkMode(!darkMode);
	const toggleColorBlind = () => setColorBlind(!colorBlind);

	return (
		<AccessibilityContext.Provider
			value={{
				increaseFontSize,
				decreaseFontSize,
				toggleDarkMode,
				toggleColorBlind,
				fontSize,
				darkMode,
				colorBlind,
			}}
		>
			{children}
		</AccessibilityContext.Provider>
	);
};

// Crear y exportar el hook personalizado
export const useAccessibility = () => useContext(AccessibilityContext);

export default AccessibilityContext;
