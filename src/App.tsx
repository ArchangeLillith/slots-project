import React, { useEffect, useRef } from "react";
import { Game } from "./Game/game";
import "./App.css";
import { drawStatusText } from "./Game/Utils/drawOnCanvas.ts";
import { EGameStates } from "./Game/Utils/Enum.ts";
import { masterArrayMaker } from "./Game/Utils/masterMaker.ts";
import ReelBorders from "./Components/reel-borders.tsx";

const App: React.FC = () => {
	// console.log(`RELOADED APP`);
	let STATE = EGameStates.LoadingState;
	let DEBUG = true;
	const CANVAS = useRef<HTMLCanvasElement>(null);
	const CTX = useRef<CanvasRenderingContext2D | null>(null);
	const GAME = useRef<any>(null);
	const animationScheduled = useRef<boolean>(false);
	let DOLLAR_BALANCE: number = 30;
	let COIN_BALANCE: number = 0;
	let COINS_PER_LINE: number = 0.05;
	let WINNINGS: number = 0;

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
				STATE = EGameStates.StoppingState;
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

	return (
		<div className="App">
			<div className="jackpot-container">
				<div className="jackpot-right">
					<p>JACKPOT</p>
					<p>$50,000</p>
				</div>
				<div className="jackpot-left">
					<p>JACKPOT</p>
					<p>$30,000</p>
				</div>
			</div>
			<div className="bottom-container">
				<div className="balance-container">
					<p className="balance-label">Balance</p>
					{COIN_BALANCE.toString().length === 1 && (
						<p className="balance-display">
							${DOLLAR_BALANCE}.{COIN_BALANCE}0
						</p>
					)}
					{COIN_BALANCE.toString().length !== 1 && (
						<p className="balance-display">
							${DOLLAR_BALANCE}.{COIN_BALANCE}
						</p>
					)}
				</div>
				<div className="coins-per-line-container">
					<p className="coins-per-line-label">Coins per line</p>
					<p className="coins-per-line-display">${COINS_PER_LINE}</p>
				</div>

				<button id="spinBtn" className="spinBtn" onClick={spinButtonClick}>
					Spin~
				</button>
				<div className="wager-container">
					<p className="wager-label">Wager</p>
					{/* Change this to lines-selected eventually */}
					<p className="wager-display">${COINS_PER_LINE * 1}</p>
				</div>

				<p className="winnings-label">Winnings</p>
				<p className="winnings-display">${WINNINGS}</p>
			</div>
			<div className="canvas-container">
				<div className="reel-border-container">
					<ReelBorders></ReelBorders>
				</div>
				<img src="images/border.png" alt="border" className="border"></img>
				<canvas id="canvas1" ref={CANVAS}></canvas>
			</div>
			<img id="otter" src="images/Riverfolk-Warrior.png" alt="otter preload" />
			<img
				id="otter-winner"
				src="images/otter-winner.png"
				alt="otter preload"
			/>
			<img id="cat" src="images/Cat-Warrior.png" alt="cat preload" />
			<img
				id="alliance-winner"
				src="images/alliance-winner.png"
				alt="alliance-winner preload"
			/>
			<img id="cat-winner" src="images/cat-winner.png" alt="cat preload" />
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
