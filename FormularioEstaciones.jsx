import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import "./FormularioEstaciones.css"; // Usando el mismo CSS que el del login para los estilos

const FormularioEstaciones = ({
    onCrear,
    onActualizar,
    onEliminar,
    estacionSeleccionada,
    onCancelarEdicion,
    onEliminarImagenCarrusel,
}) => {
    const [formData, setFormData] = useState({
        titulo: "",
        descripcionCorta: "",
        descripcionLarga: "",
        latitud: "",
        longitud: "",
        portada: null,
        carrusel: [],
    });
    const [imagenesCargadas, setImagenesCargadas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    const resetForm = () => {
        setFormData({
            titulo: "",
            descripcionCorta: "",
            descripcionLarga: "",
            latitud: "",
            longitud: "",
            portada: null,
            carrusel: [],
        });
        setImagenesCargadas([]);
        setModoEdicion(false);
    };

    useEffect(() => {
        if (estacionSeleccionada) {
            setFormData({
                titulo: estacionSeleccionada.titulo || "",
                descripcionCorta: estacionSeleccionada.descripcionCorta || "",
                descripcionLarga: estacionSeleccionada.descripcionLarga || "",
                latitud: estacionSeleccionada.latitud || "",
                longitud: estacionSeleccionada.longitud || "",
                portada: null,
                carrusel: [],
            });
            const carruselCargado =
                estacionSeleccionada.imagenesCarruselUrls || [];
            setImagenesCargadas(carruselCargado);
            setModoEdicion(true);
        } else {
            resetForm();
        }
    }, [estacionSeleccionada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("titulo", formData.titulo);
        data.append("descripcionCorta", formData.descripcionCorta);
        data.append("descripcionLarga", formData.descripcionLarga);
        data.append("latitud", formData.latitud);
        data.append("longitud", formData.longitud);

        if (formData.portada && formData.portada.length > 0) {
            data.append("portada", formData.portada[0]);
        }

        if (formData.carrusel && formData.carrusel.length > 0) {
            for (let i = 0; i < formData.carrusel.length; i++) {
                data.append("carrusel", formData.carrusel[i]);
            }
        }

        if (estacionSeleccionada && typeof onActualizar === "function") {
            await onActualizar(estacionSeleccionada.id, data);
            resetForm();
        } else if (typeof onCrear === "function") {
            await onCrear(data);
            resetForm();
        }
    };

    const handleEliminarEstacion = () => {
        if (confirm("¿Estás seguro de que quieres eliminar esta estación?")) {
            onEliminar(estacionSeleccionada.id);
            resetForm();
        }
    };

    const handleEliminarImagen = (indice) => {
        if (confirm("¿Eliminar esta imagen del carrusel?")) {
            onEliminarImagenCarrusel(estacionSeleccionada.id, indice);
        }
    };

    return (
        <form className="formulario-estacion" onSubmit={handleSubmit}>
            <label htmlFor="titulo">Título</label>
            <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
            />

            <label htmlFor="descripcionCorta">Descripción corta</label>
            <input
                type="text"
                id="descripcionCorta"
                name="descripcionCorta"
                value={formData.descripcionCorta}
                onChange={handleChange}
                required
            />

            <label htmlFor="descripcionLarga">Descripción larga</label>
            <textarea
                id="descripcionLarga"
                name="descripcionLarga"
                value={formData.descripcionLarga}
                onChange={handleChange}
                required
            />

            <div className="coordenadas-group">
                <div>
                    <label htmlFor="latitud">Latitud</label>
                    <input
                        type="number"
                        step="any"
                        id="latitud"
                        name="latitud"
                        value={formData.latitud}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="longitud">Longitud</label>
                    <input
                        type="number"
                        step="any"
                        id="longitud"
                        name="longitud"
                        value={formData.longitud}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <label htmlFor="portada">Imagen de portada</label>
            <input
                type="file"
                id="portada"
                name="portada"
                onChange={handleFileChange}
                accept="image/*"
            />

            <label htmlFor="carrusel">Imágenes del carrusel</label>
            <input
                type="file"
                id="carrusel"
                name="carrusel"
                onChange={handleFileChange}
                multiple
                accept="image/*"
            />

            {imagenesCargadas.length > 0 && (
                <div className="imagenes-previas">
                    <h4>Imágenes cargadas</h4>
                    <div className="preview-grid">
                        {imagenesCargadas.map((url, i) => (
                            <div key={i} className="imagen-item">
                                <img
                                    src={url}
                                    alt={`img-${i}`}
                                    style={{ maxWidth: "100%" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleEliminarImagen(i)}
                                    aria-label="Eliminar imagen"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {formData.portada && (
                <div className="imagen-portada">
                    <h4>Imagen de portada</h4>
                    <img
                        src={URL.createObjectURL(formData.portada[0])}
                        alt="Portada"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
            )}

            <div className="form-botones">
                <button type="submit" className="boton-principal">
                    <FaEdit /> {modoEdicion ? "Guardar" : "Crear estación"}
                </button>
                {modoEdicion && (
                    <>
                        <button
                            type="button"
                            className="eliminar"
                            onClick={handleEliminarEstacion}
                        >
                            <FaTrashAlt /> Eliminar
                        </button>
                        <button
                            type="button"
                            className="cancelar"
                            onClick={onCancelarEdicion}
                        >
                            <FaTimes /> Cancelar
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default FormularioEstaciones;