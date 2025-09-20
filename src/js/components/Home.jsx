import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const userName = "junior";
	const API_URL = `https://playground.4geeks.com/todo/users/${userName}`;
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		createUser();
		fetchTasks();
	}, []);


	const fetchTasks = async () => {
		setLoading(true);
		setError(null);
		try {
			const resp = await fetch(API_URL);
			if (!resp.ok) throw new Error("Error al obtener tareas");
			const data = await resp.json();
			setList(data.todos || []);
		} catch (error) {
			setError("Hubo un error al obtener las tareas");
			setList([]);
		} finally {
			setLoading(false);
		}
	};

	const createUser = async () => {
		try {
			const resp = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			});
			if (resp.status === 201 || resp.status === 400) {
				// Usuario creado o ya existe
			} else {
				setError("Error al crear usuario: " + resp.status);
			}
		} catch (error) {
			setError("Hubo un error al crear el usuario");
		}
	};

	const aggTask = async () => {
		const trimmed = task.trim();
		if (!trimmed) return;
		setLoading(true);
		setError(null);
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
				method: "POST",
				body: JSON.stringify({ label: trimmed, done: false }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			setTask("");
			fetchTasks();
		} catch (error) {
			setError("Hubo un error al agregar la tarea");
		} finally {
			setLoading(false);
		}
	};
	const dellTask = async (index) => {
		setLoading(true);
		setError(null);
		try {
			const taskId = list[index]?.id;
			if (!taskId) throw new Error("ID de tarea no encontrado");
			await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
				method: "DELETE"
			});
			fetchTasks();
		} catch (error) {
			setError("Hubo un error al eliminar la tarea");
		} finally {
			setLoading(false);
		}
	};
	const clearAllTasks = async () => {
		setLoading(true);
		setError(null);
		try {
			for (const item of list) {
				await fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
					method: "DELETE"
				});
			}
			fetchTasks();
		} catch (error) {
			setError("Hubo un error al eliminar todas las tareas");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="container">
			<h1>Todo List</h1>
			<input
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						await aggTask();
					}
				}}
				placeholder="Ingrese una tarea"
			/>
			<button className="btn btn-danger my-2" onClick={clearAllTasks} disabled={loading || list.length === 0}>
				Limpiar tareas
			</button>
			<ul className="task-list">
				{list.length === 0 ? (
					<li className="no-tasks alert alert-info">No hay tareas</li>
				) : (
					list.map((item, index) => (
						<li key={item.id || index} className="task-item">
							<span>{item.label}</span>
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