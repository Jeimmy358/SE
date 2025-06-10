import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { loginRequest } from "../services/authService";

export const useAuthService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const token = await loginRequest(email, password);
            setLoading(false);
            return token;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return { login, loading, error };
};


export const useAuth = () => useContext(AuthContext);