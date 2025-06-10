import { useEspecies } from "../../hooks/useEspecies";
import { useAccessibility } from "../../hooks/useAccessibility"; // Asumo que así se llama tu hook
import styles from "./Species.module.css"; // Asumo que usas CSS modules para estilos

function Species() {
	const { especies } = useEspecies();
	const { accessibilityClass } = useAccessibility(); // Ejemplo: devuelve una clase CSS para accesibilidad

	return (
		<div className={`${styles.container} ${accessibilityClass}`}>
			{especies.map((item, i) => (
				<div key={i} className={styles.specieCard}>
					<h3 className={styles.specieName}>{item.nombre_comun}</h3>
					<p className={styles.specieDescription}>
						{item.descripcion}
					</p>
					{item.modelo_3d && (
						<iframe
							src={item.modelo_3d}
							frameBorder="0"
							allow="autoplay; fullscreen; xr-spatial-tracking"
							allowFullScreen
							className={styles.model3d}
							title={item.nombre_comun}
						></iframe>
					)}
				</div>
			))}
		</div>
	);
}

export default Species;
