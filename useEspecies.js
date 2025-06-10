import { useEffect, useState } from "react";
import especiesData from "../data/especies.json"; // Suponiendo que lo tienes en `src/data/especies.json`

export function useEspecies() {
	const [especies, setEspecies] = useState([]);

	useEffect(() => {
		setEspecies(especiesData);
	}, []);

	return { especies };
}
