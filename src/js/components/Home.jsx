import React from "react";
import { useState, useEffect } from "react";

//create your first component
const Home = () => {




	return (
		<div className="container">
			<h1>Todo List</h1>
			<input type="text"/>
			<button>Agregar</button>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>

		</div>
	);
};

export default Home;