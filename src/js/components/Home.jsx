import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const user = "junior";
	// Limpiar todas las tareas y sincronizar con el backend
	const clearAllTasks = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(API_URL, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Error al limpiar tareas");
			// Esperar a que el backend procese y luego volver a consultar la lista
			await fetchTasks();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
			<h1>Todo List</h1>
			<input
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						aggTask();
					}
				}}
				placeholder="Ingrese una tarea"
			/>
			<ul className="task-list">
				{list.length === 0 ? (
					<li className="no-tasks alert alert-info">No hay tareas</li>
				) : (
					list.map((item, index) => (
						<li key={index} className="task-item">
							<span>{item}</span>
							<span
								className="delete-button"
								onClick={async () => await dellTask(index)}
								style={{ cursor: "pointer" }}
							>
								&#10006;
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Home;