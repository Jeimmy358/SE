import React, { useState, useEffect, useCallback, useRef } from "react";
import useNews from "../../hooks/useNews"; // Importa el hook
import "./Banner.css";
import { useAccessibility } from "../../hooks/useAccessibility";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import truncateText from "../../utils/truncateText"; // Asumiendo que creaste esta utilidad

const MAX_DESCRIPTION_LENGTH = 180;

const Banner = () => {
    const { news, loading, error } = useNews("environment"); // Usa el hook para obtener las noticias
    const [currentIndex, setCurrentIndex] = useState(0);
    const { fontSize, darkMode } = useAccessibility();
    const bannerSliderRef = useRef(null);
    const [largeFont, setLargeFont] = useState(false);
    const [smallFont, setSmallFont] = useState(false);

    useEffect(() => {
        setLargeFont(fontSize > 16);
        setSmallFont(fontSize < 16);
    }, [fontSize]);

    const goToNext = useCallback(() => {
        if (!news || news.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, [news]);

    useEffect(() => {
        if (news && news.length > 0) {
            const intervalId = setInterval(goToNext, 20000);
            return () => clearInterval(intervalId);
        }
    }, [goToNext, news]);

    const goToPrevious = () => {
        if (!news || news.length === 0) return;
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + news.length) % news.length
        );
    };

    const goToSlide = (index) => {
        if (!news || index < 0 || index >= news.length) return;
        setCurrentIndex(index);
    };

    const cardClass = `banner-card ${largeFont ? "large-font" : ""} ${
        smallFont ? "small-font" : ""
    } ${darkMode ? "high-contrast-card" : ""}`;
    const titleClass = `banner-title ${largeFont ? "large-font" : ""} ${
        smallFont ? "small-font" : ""
    } ${darkMode ? "high-contrast-text" : ""}`;
    const descriptionClass = `banner-description ${
        largeFont ? "large-font" : ""
    } ${smallFont ? "small-font" : ""} ${
        darkMode ? "high-contrast-text-secondary" : ""
    }`;
    const linkClass = `banner-link ${largeFont ? "large-font" : ""} ${
        smallFont ? "small-font" : ""
    } ${darkMode ? "high-contrast-link" : ""}`;
    const dateClass = `banner-date ${largeFont ? "large-font" : ""} ${
        smallFont ? "small-font" : ""
    } ${darkMode ? "high-contrast-text-tertiary" : ""}`;
    const bannerClass = `banner-container ${largeFont ? "large-font" : ""} ${
        smallFont ? "small-font" : ""
    } ${darkMode ? "high-contrast-banner" : ""}`;

    if (loading) {
        return <div>Cargando noticias...</div>;
    }

    if (error) {
        return <div>Error al cargar las noticias: {error}</div>;
    }

    if (!news || news.length === 0) {
        return <div>No hay noticias para mostrar.</div>; // Manejo de caso sin noticias
    }

    return (
        <div className={bannerClass}>
            <div className="banner-slider-wrapper">
                <button
                    className="banner-arrow left"
                    onClick={goToPrevious}
                    aria-label="Noticia anterior"
                    disabled={news.length <= 1} // Deshabilitar si solo hay una noticia o ninguna
                >
                    <FaChevronLeft />
                </button>
                <div
                    className="banner-slider"
                    ref={bannerSliderRef}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {news.map((item, index) => (
                        <div key={index} className={`banner-slide`}>
                            <div className={cardClass}>
                                {item.imageUrl && (
                                    <div className="banner-image-container">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="banner-image"
                                        />
                                    </div>
                                )}
                                <div className="banner-card-content">
                                    <h3 className={titleClass}>{item.title}</h3>
                                    <p className={descriptionClass}>
                                        {truncateText(item.description, MAX_DESCRIPTION_LENGTH)}
                                    </p>
                                    <p className={dateClass}>
                                        {new Date(item.pubDate).toLocaleDateString()}
                                    </p>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkClass}
                                    >
                                        Leer más
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="banner-arrow right"
                    onClick={goToNext}
                    aria-label="Siguiente noticia"
                    disabled={news.length <= 1} // Deshabilitar si solo hay una noticia o ninguna
                >
                    <FaChevronRight />
                </button>
            </div>
            {news.length > 1 && ( // Mostrar indicadores solo si hay más de una noticia
                <div className="banner-indicators">
                    {news.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator-dot ${
                                currentIndex === index ? "active" : ""
                            } ${darkMode ? "high-contrast-indicator" : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir a la noticia ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;