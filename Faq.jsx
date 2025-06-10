import React, { useState } from "react";
import { useAccessibility } from "../../hooks/useAccessibility"; // Corrige la importación
import "./Faq.css";

const Faq = () => {
	const [activeIndex, setActiveIndex] = useState(null); // Estado para controlar qué pregunta está desplegada

	const { darkMode, colorBlind } = useAccessibility(); // Obtener el modo de accesibilidad actual

	const handleToggle = (index) => {
		setActiveIndex(activeIndex === index ? null : index); // Si la misma pregunta se selecciona, se colapsa
	};

	const faqs = [
		{
			question: "¿Qué es el sendero ecológico?",
			answer: "El sendero ecológico es un recorrido educativo dentro del campus universitario, diseñado para conectar a los visitantes con la naturaleza. Consta de 18 estaciones que incluyen áreas naturales, centros de investigación y zonas de manejo ambiental, donde se puede aprender sobre biodiversidad, conservación y sostenibilidad.",
		},
		{
			question: "¿Quién puede visitar el sendero?",
			answer: "Está abierto a:\n\nEstudiantes y docentes de la universidad.\nVisitantes externos (previa coordinación).\nGrupos escolares o turísticos (con reservación).",
		},
		{
			question: "¿Qué debo llevar para la visita?",
			answer: "Ropa cómoda y calzado cerrado.\nAgua, bloqueador solar y repelente de insectos.\nCámara o binoculares (opcional, para avistamiento de fauna).",
		},
		{
			question: "¿Hay restricciones en estas estaciones?",
			answer: "Sí, está prohibido:\n✗ Alimentar a los animales\n✗ Colectar plantas o minerales\n✗ Salir de los senderos demarcados",
		},
		{
			question:
				"¿Qué actividades se realizan en la estación Manejo de Residuos Sólidos?",
			answer: "En esta área se gestionan todos los residuos generados en el campus mediante:\n- Separación de materiales reciclables (plástico, vidrio, papel)\n- Proceso de compostaje de orgánicos\n- Manejo especial de residuos peligrosos",
		},
		{
			question: "¿Por qué es importante visitar esta estación?",
			answer: "Porque:\n- Aprendes sobre economía circular\n- Ves el proceso completo de gestión de residuos\n- Conoces cómo contribuir a reducir tu huella ecológica",
		},
		{
			question:
				"¿Qué especie animal asociada puedo observar en la estación Manejo de Residuos Sólidos?",
			answer: "El murciélago Saccopteryx leptura, que:\n- Usa las estructuras como refugio diurno\n- Controla plagas de insectos naturalmente\n- Es inofensivo para los visitantes",
		},
		{
			question:
				"¿Qué características tiene el bambusal en la estación Rata del Bambú?",
			answer: "• Dominado por especies de Guadua sp.\n• Funciona como barrera natural contra la erosión\n• Provee materia prima para artesanías locales",
		},
		{
			question: "¿Por qué se llama así esta estación?",
			answer: "Por la presencia de la Dactylomys dactylinus, un roedor que:\n- Es endémico de la región\n- Se alimenta de brotes de bambú",
		},
		{
			question:
				"¿Cuál es el mejor horario para observar fauna en la estación Rata del Bambú?",
			answer: "Al atardecer o amanecer, cuando:\n- La rata del bambú está más activa\n- Se pueden escuchar sus llamados\n- La temperatura es más agradable",
		},
		{
			question: "¿Es peligrosa la serpiente coral en la estación Coral?",
			answer: "Es venenosa pero:\n- Es tímida y evita el contacto\n- Solo ataca si se siente amenazada\n- Se recomienda mantener distancia y no manipularla",
		},
		{
			question:
				"¿Qué otras especies puedo encontrar en la estación Coral?",
			answer: "• Aves: Carpintero azulado (Melanerpes cruentatus)\n• Mamíferos: Mono ardilla (Saimiri cassiquiarensis)\n• Reptiles: Tortugas acuáticas",
		},
		{
			question: "¿Por qué se llama 'Coral' esta estación?",
			answer: "Por:\n- La presencia de la serpiente coral\n- La analogía con los ecosistemas coralinos (alta biodiversidad)\n- La red de interacciones ecológicas que ocurren aquí",
		},
	];

	return (
		<div
			className={`faq-container ${darkMode ? "dark-mode" : ""} ${
				colorBlind ? "color-blind" : ""
			}`}
		>
			<h1>Preguntas Frecuentes (FAQ) – Sendero Ecológico</h1>
			<div className="faq-list">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className={`faq-item ${
							activeIndex === index ? "active" : ""
						}`}
					>
						<div
							className="faq-question"
							onClick={() => handleToggle(index)}
						>
							<h3>{faq.question}</h3>
							<span>{activeIndex === index ? "-" : "+"}</span>
						</div>
						{activeIndex === index && (
							<div className="faq-answer">
								<p>{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Faq;
