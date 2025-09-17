import React from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	const aggTask = () => {
		if (task.trim() !== "") {
			setList([...list, task]);
			setTask("");
		}
	};

	const dellTask = (index) => {
		const newList = list.filter((item, i) => i !== index);
		setList(newList);
	};

	return (
		<div className="container">
			<h1>Todo List</h1>
			<input
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				placeholder="Ingrese una tarea"
			/>
			<button onClick={aggTask}>Agregar</button>
			<ul className="task-list">
				{list.length === 0 ? (
					<li className="no-tasks">No hay tareas</li>
				) : (
					list.map((item, index) => (
						<li key={index} className="task-item">
							<span>{item}</span>
							<span 
								className="delete-button"
								onClick={() => dellTask(index)}
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