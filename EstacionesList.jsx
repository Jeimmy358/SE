import React from 'react';
import { Link } from 'react-router-dom';
import './EstacionesList.css';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useEstaciones } from '../../hooks/useEstaciones'; // Importa el hook completo

const EstacionesList = () => {
    const { estaciones, loading, error } = useEstaciones(); // Llama al hook para obtener el estado
    const { fontSize, darkMode } = useAccessibility();

    const cardStyle = {
        fontSize: `${fontSize}px`,
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#eee' : '#333',
        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
    };

    const titleStyle = {
        fontSize: `${fontSize * 1.2}px`,
        color: darkMode ? '#fff' : '#000',
    };

    const descriptionStyle = {
        fontSize: `${fontSize * 0.9}px`,
        color: darkMode ? '#ddd' : '#555',
    };

    if (loading) {
        return <div>Cargando estaciones...</div>;
    }

    if (error) {
        return <div>Error al cargar las estaciones: {error}</div>;
    }

    return (
        <div className="estaciones-list-container" style={{ backgroundColor: darkMode ? '#222' : '#f9f9f9' }}>
            <h2 style={{ color: darkMode ? '#fff' : '#333', fontSize: `${fontSize * 1.4}px` }}>Nuestras Estaciones</h2>
            <div className="estaciones-grid">
                {estaciones.map(estacion => (
                    <Link
                        to={`/estaciones/${estacion.id}`}
                        key={estacion.id}
                        className="estacion-card"
                        style={cardStyle}
                    >
                        {estacion.imagenDestacadaUrl && (
                            <div className="estacion-image-container">
                                <img
                                    src={estacion.imagenDestacadaUrl}
                                    alt={estacion.titulo}
                                    className="estacion-image"
                                />
                            </div>
                        )}
                        <div className="estacion-info">
                            <h3 className="estacion-title" style={titleStyle}>{estacion.titulo}</h3>
                            <p className="estacion-descripcion" style={descriptionStyle}>{estacion.descripcionCorta}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EstacionesList;