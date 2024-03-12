import React, { useEffect, useState, useRef } from "react";
import { Game } from "./Game/game";
import "./App.css";
import { drawStatusText } from "./Game/Utils/utilFunctions";
import { EGameStates } from "./Enum.js";
import { masterArrayMaker } from "./Game/Utils/masterMaker.ts";

const App: React.FC = () => {
	// console.log(`RELOADED APP`);
	let STATE = EGameStates.LoadingState;
	let DEBUG = true;
	const CANVAS = useRef<HTMLCanvasElement>(null);
	const CTX = useRef<CanvasRenderingContext2D | null>(null);
	const GAME = useRef<any>(null);
	const animationScheduled = useRef<boolean>(false);

	useEffect(() => {
		setUp();
	});

	const setUp = () => {
		//If the canvas exists adn we have a hold on the current one
		if (CANVAS.current) {
			//Get the context of the canvas
			CTX.current = CANVAS.current.getContext("2d");
			CANVAS.current.width = window.innerWidth;
			CANVAS.current.height = window.innerHeight;

			//Once we have the current context we call and make a new game object
			//Here we should initialize the master symbol list as per each symbols rate
			const MASTER_SYMBOL_LIST: any = masterArrayMaker();
			if (CTX.current) {
				GAME.current = new Game(
					CANVAS.current,
					CANVAS.current.width,
					CANVAS.current.height,
					MASTER_SYMBOL_LIST
				);

				//Set initial state
				STATE = EGameStates.IdleState;
				//Initiialize the pieces into the array and onto the canvas
				GAME.current.initialize();
				//Start the animation loop
				animate();
			}
		}
	};

	const animate = () => {
		//Ready check
		if (CTX.current && CANVAS.current && GAME.current) {
			//Clearing canvas for the next frame
			CTX.current.clearRect(0, 0, CANVAS.current.width, CANVAS.current.height);

			//Debug check
			if (DEBUG) drawStatusText(CTX.current, STATE);

			//Calling game update function and passing state so it knows what to do
			GAME.current.update(CTX.current, STATE);

			// Check if game is not over and animation is not already scheduled
			if (!GAME.current.gameOver && !animationScheduled.current) {
				// Mark animation as scheduled
				animationScheduled.current = true;
				// Schedule animation to run
				requestAnimationFrame(() => {
					// Clear scheduled animation flag
					animationScheduled.current = false;
					// Call animate again for the next animation frame
					animate();
				});
			}
		}
	};

	const spinButtonClick = () => {
		if (GAME.current && STATE !== EGameStates.SpinningState) {
			STATE = EGameStates.SpinningState;
			//Call to the game file to start the spin
			GAME.current.spin(0);
			setTimeout(() => {
				GAME.current.spin(1);
			}, 500);
			setTimeout(() => {
				GAME.current.spin(2);
			}, 1000);
			setTimeout(() => {
				GAME.current.spin(3);
			}, 1500);
			setTimeout(() => {
				GAME.current.spin(4);
			}, 2000);

			setTimeout(() => {
				// STATE = EGameStates.StoppingState;
				GAME.current.stopSpin(0);
				setTimeout(() => {
					GAME.current.stopSpin(1);
				}, 500);
				setTimeout(() => {
					GAME.current.stopSpin(2);
				}, 1000);
				setTimeout(() => {
					GAME.current.stopSpin(3);
				}, 1500);
				setTimeout(() => {
					GAME.current.stopSpin(4);
					STATE = EGameStates.IdleState;
				}, 2000);
				//Manually reset the state
			}, 2000);
		}
	};

	const stopSpin = () => {
		//PANIC BUTTON
		if (GAME.current) {
			// GAME.current.stop();
			GAME.current.gameOver = true;
		}
	};

	return (
		<div className="App">
			<button id="spinBtn" onClick={spinButtonClick}>
				Spin~
			</button>
			<button id="stopBtn" onClick={stopSpin}>
				Stop~
			</button>
			<canvas id="canvas1" ref={CANVAS}></canvas>
			<img id="otter" src="images/Riverfolk-Warrior.png" alt="otter preload" />
			<img id="cat" src="images/Cat-Warrior.png" alt="cat preload" />
			<img id="corvid" src="images/Corvid-Warrior.png" alt="corvid preload" />
			<img id="eyrie" src="images/Eyrie-Warrior.png" alt="eyrie preload" />
			<img id="duchy" src="images/Duchy-Warrior.png" alt="duchy preload" />
			<img
				id="alliance"
				src="images/Alliance-Warrior.png"
				alt="alliance preload"
			/>
		</div>
	);
};

//Put here to ensure it doesn't get reinitialized when the component renders again

export default App;
