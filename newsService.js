// src/services/newsService.js
import { API_URL } from '../config/config';

const fetchNewsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/news/${category}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

export { fetchNewsByCategory };