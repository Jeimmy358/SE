import { API_URL } from "../config/config";

export const loginRequest = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Autenticación fallida. Verifica tus datos.";
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.token;
};