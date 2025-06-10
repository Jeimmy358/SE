import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const EstacionesMapa = ({ estacion }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (
			!mapRef.current &&
			estacion &&
			estacion.latitud &&
			estacion.longitud
		) {
			mapRef.current = L.map("mapid").setView(
				[estacion.latitud, estacion.longitud],
				15
			);

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(mapRef.current);

			L.marker([estacion.latitud, estacion.longitud])
				.addTo(mapRef.current)
				.bindPopup(
					`<b>${estacion.titulo}</b><br>${estacion.descripcionCorta}`
				)
				.openPopup();
		} else if (
			mapRef.current &&
			estacion &&
			estacion.latitud &&
			estacion.longitud
		) {
			// Si el mapa ya existe, solo actualizamos la vista y el marcador
			mapRef.current.setView([estacion.latitud, estacion.longitud], 15);
			mapRef.current.eachLayer((layer) => {
				if (layer instanceof L.Marker) {
					layer
						.setLatLng([estacion.latitud, estacion.longitud])
						.bindPopup(
							`<b>${estacion.titulo}</b><br>${estacion.descripcionCorta}`
						)
						.openPopup();
				}
			});
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [estacion]);

	return <div id="mapid" style={{ width: "100%", height: "400px" }}></div>;
};

export default EstacionesMapa;
