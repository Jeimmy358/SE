import React from "react";
import { MdEdit } from "react-icons/md";
import "./TablaEstaciones.css";

const TablaEstaciones = ({ data, onEdit }) => {
	return (
		<div className="admin-table-container">
			<table className="admin-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Título</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td
								colSpan="3"
								style={{
									textAlign: "center",
									padding: "1.5rem",
								}}
							>
								No hay datos disponibles.
							</td>
						</tr>
					) : (
						data.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.titulo}</td>
								<td>
									<button
										className="admin-edit-btn"
										onClick={() => onEdit(item)}
									>
										<MdEdit /> Editar
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TablaEstaciones;
