import { useContext } from "react";
import AccessibilityContext from "../contexts/AccessibilityContext";  // Importa el contexto

// Hook personalizado para consumir el contexto de accesibilidad
export const useAccessibility = () => useContext(AccessibilityContext);
