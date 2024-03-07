import React from "react";
import { useEffect } from "react";
// import { GameObject } from "./Types.js";
import { Game } from "./Game/game";
import { UserContext, GlobalContext } from "./context.jsx";
import "./App.css";

function App() {
	const [user, setUser] = React.useState({
		user: "",
	});
	const [globalContext, setGlobalContext] = React.useState({ debug: true });

	//time handlers
	let LAST_TIME = 0;
	let CANVAS: HTMLCanvasElement;
	let CTX: CanvasRenderingContext2D | null;
	let GAME: any;
	useEffect(() => {
		setUp();
	});
	return (
		<div className="App">
			<p id="debug"></p>
			<button id="debugBtn" onClick={debugToggle}>
				Debug
			</button>
			<button id="spinBtn" onClick={startSpin}>
				Spin~
			</button>
			<canvas id="canvas1"></canvas>
			<img id="otter" src="images/Riverfolk-Warrior.png" alt="otter preload" />
			<img id="cat" src="images/Riverfolk-Warrior.png" alt="cat preload" />
			{/* <button id="stopBtn" onClick="Game.stopHandler()"> 
				Stop~
			</button> */}
		</div>
	);

	function setUp() {
		//Global setup and declarations
		CANVAS = document.getElementById("canvas1") as HTMLCanvasElement;
		CTX = CANVAS.getContext("2d");
		CANVAS.width = window.innerWidth;
		CANVAS.height = window.innerHeight;
		GAME = new Game(CANVAS, CANVAS.width, CANVAS.height, CTX);
		animate(10);
		console.log("Game", GAME);
	}

	function animate(timestamp: number) {
		CTX?.clearRect(0, 0, CANVAS.width, CANVAS.height);
		let deltaTime = timestamp - LAST_TIME;
		LAST_TIME = timestamp;
		GAME.update(deltaTime);
		if (!GAME.gameOver) requestAnimationFrame(animate);
		// else drawGameOver();
	}

	function debugToggle() {
		let para = document.getElementById("debug");
		setGlobalContext({ debug: !globalContext.debug });
		if (globalContext.debug === true && para) {
			para.innerHTML = GAME.currentState.state;
		}
	}

	function startSpin() {
		console.log(GAME);
		GAME.spin();
	}
}

export default App;
