// src/hooks/useFetchNews.js
import { useState, useEffect } from 'react';
import { fetchNewsByCategory } from '../services/newsService';

const useNews = (category) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchNewsByCategory(category);
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [category]); // La dependencia `category` asegura que se refetch si cambia

    return { news, loading, error };
};

export default useNews;