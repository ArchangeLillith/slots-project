import React, { useEffect, useState, useRef } from "react";
import { GlobalContext } from "./context";
import { Game } from "./Game/game";
import "./App.css";

const App: React.FC = () => {
	const [globalContext, setGlobalContext] = React.useState({
		state: "LOADING", //Initialize to loading state until everything is loaded, then it will change to idle
	});
	const [spinEnabled, setSpinEnabled] = useState(true);
	const [debugState, setDebugState] = useState({ debug: true });
	const CANVAS = useRef<HTMLCanvasElement>(null);
	const CTX = useRef<CanvasRenderingContext2D | null>(null);
	const GAME = useRef<any>(null);
	const animationScheduled = useRef<boolean>(false);

	useEffect(() => {
		setUp();
	}, []);

	const setUp = () => {
		if (CANVAS.current) {
			CTX.current = CANVAS.current.getContext("2d");
			if (CTX.current) {
				CANVAS.current.width = window.innerWidth;
				CANVAS.current.height = window.innerHeight;
				GAME.current = new Game(
					CANVAS.current,
					CANVAS.current.width,
					CANVAS.current.height,
					CTX.current
				);
				setGlobalContext({ state: GAME.current.currentState });
				animate(Date.now());
			}
		}
	};

	const animate = (timestamp: number) => {
		if (CTX.current && CANVAS.current && GAME.current) {
			CTX.current.clearRect(0, 0, CANVAS.current.width, CANVAS.current.height);
			const deltaTime = timestamp - LAST_TIME;
			LAST_TIME = timestamp;
			GAME.current.update(deltaTime);

			// Check if game is not over and animation is not already scheduled
			if (!GAME.current.gameOver && !animationScheduled.current) {
				// Mark animation as scheduled
				animationScheduled.current = true;

				// Schedule animation to run
				requestAnimationFrame(() => {
					// Clear scheduled animation flag
					animationScheduled.current = false;

					// Call animate again for the next animation frame
					animate(Date.now());
				});
			}
		}
	};

	const debugToggle = () => {
		setDebugState((prevDebugState) => ({
			...prevDebugState,
			debug: !debugState.debug,
		}));
	};

	const startSpin = () => {
		if (GAME.current && spinEnabled) {
			// Disable spin button to prevent multiple spins within the limit
			setSpinEnabled(false);
			GAME.current.spin();
			// Enable spin button after 1 second
			setTimeout(() => setSpinEnabled(true), 500);
			GAME.current.currentState = "IDLE";
		}
		setGlobalContext({ state: GAME.current.currentState });
	};

	const stopSpin = () => {
		if (GAME.current) {
			GAME.current.stop();
			GAME.current.gameOver = true;
		}
	};

	return (
		<GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
			<div className="App">
				<p id="debug">{globalContext.state}</p>
				<button id="debugBtn" onClick={debugToggle}>
					Debug
				</button>
				<button id="spinBtn" onClick={startSpin} disabled={!spinEnabled}>
					Spin~
				</button>
				<button id="stopBtn" onClick={stopSpin}>
					Stop~
				</button>
				<canvas id="canvas1" ref={CANVAS}></canvas>
				<img
					id="otter"
					src="images/Riverfolk-Warrior.png"
					alt="otter preload"
				/>
				<img id="cat" src="images/Riverfolk-Warrior.png" alt="cat preload" />
			</div>
		</GlobalContext.Provider>
	);
};

//Put here to ensure it doesn't get reinitialized at 0 when the component renders again
let LAST_TIME = 0;

export default App;
