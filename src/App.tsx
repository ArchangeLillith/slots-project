import React, { useEffect, useRef } from "react";
import { Game } from "./Game/game";
import "./App.css";
import { drawStatusText } from "./Game/Utils/drawOnCanvas.ts";
import { EGameStates } from "./Game/Utils/Enum.ts";
import { masterArrayMaker } from "./Game/Utils/masterMaker.ts";
import ReelBorders from "./Components/reel-borders.tsx";
import { createArrays } from "./Game/Utils/setup.ts";
import { Symbols } from "./Game/Classes/symbols.ts";

//These need to sit here because if they're within the compenent they interfere with the workings of everything on component reload
let firstTime = true;
let STATE = EGameStates.LoadingState;

const App: React.FC = () => {
	// console.log(`RELOADED APP`);
	let DEBUG = true;
	const CANVAS = useRef<HTMLCanvasElement>(null);
	const CTX = useRef<CanvasRenderingContext2D | null>(null);
	const GAME = useRef<any>(null);
	const animationScheduled = useRef<boolean>(false);
	const [balance, setBalance] = React.useState(30);
	const [coinsPerLine, setCoinsPerLine] = React.useState(5);
	const [smallJackpot, setSmallJackpot] = React.useState(500);
	const [largeJackpot, setLargeJackpot] = React.useState(2000);
	const [winnings, setWinnings] = React.useState(-1);
	let LINES_IN_PLAY: number = 5;
	let WAGER: number = (coinsPerLine / 100) * LINES_IN_PLAY;
	let stopCol0Timeout: string | number | NodeJS.Timeout | undefined;
	let stopCol1Timeout: string | number | NodeJS.Timeout | undefined;
	let stopCol2Timeout: string | number | NodeJS.Timeout | undefined;
	let stopCol3Timeout: string | number | NodeJS.Timeout | undefined;
	let stopCol4Timeout: string | number | NodeJS.Timeout | undefined;
	let stopTimeOut: string | number | NodeJS.Timeout | undefined;
	let spinCol4Timeout: NodeJS.Timeout;

	useEffect(() => {
		setUp();
	});

	const setUp = () => {
		if (!firstTime) return;
		//If the canvas exists adn we have a hold on the current one
		firstTime = false;
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
				//Will return a map and the SYMBOLS array
				const arrays: { SYMBOLS_ARRAY: Symbols[]; SYMBOLS_MAP: Symbols[][] } =
					createArrays(CANVAS.current, 5, 5, MASTER_SYMBOL_LIST);
				//Set the GAME SYMBOLS to what the setup has done
				GAME.current.SYMBOLS = arrays.SYMBOLS_ARRAY;
				GAME.current.SYMBOLS_MAP = arrays.SYMBOLS_MAP;
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
			GAME.current.update(
				CTX.current,
				STATE,
				GAME.current.SYMBOLS,
				GAME.current.SYMBOLS_MAP
			);

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

	function increaseCoinsPerLine() {
		setCoinsPerLine(coinsPerLine + 5);
	}
	function decreaseCoinsPerLine() {
		setCoinsPerLine(coinsPerLine - 5);
	}

	function formatCurrency(x: number) {
		return x.toFixed(2);
	}

	function createSpinTimeOut(column: number, delay: number) {
		return setTimeout(() => {
			GAME.current.spin(column, GAME.current.SYMBOLS_MAP);
		}, delay);
	}

	function createStopTimeOut(column: number, delay: number) {
		return setTimeout(() => {
			GAME.current.stopSpin(
				column,
				GAME.current.SYMBOLS_MAP,
				GAME.current.SYMBOLS
			);
		}, delay);
	}

	const spinButtonClick = () => {
		//Make sure we have a game to latch onto, and that the state is idle as the player shouldn't be able to do any of this if it's in any other state
		if (GAME.current) {
			//Resets the winnings to ensure nothing gets cross added accidentally
			setWinnings(0);
			//Subtracts the amoutn of the wager from the balance
			setBalance(
				parseFloat(
					formatCurrency(balance - (coinsPerLine / 100) * LINES_IN_PLAY)
				)
			);
			//The initial to get the reels spinning
			if (STATE !== EGameStates.SpinningState) {
				STATE = EGameStates.SpinningState;
				createSpinTimeOut(0, 0);
				createSpinTimeOut(1, 500);
				createSpinTimeOut(2, 1000);
				createSpinTimeOut(3, 1500);
				spinCol4Timeout = createSpinTimeOut(4, 2000);
				stopTimeOut = setTimeout(() => {
					STATE = EGameStates.StoppingState;
					stopCol0Timeout = createStopTimeOut(0, 1000);
					stopCol1Timeout = createStopTimeOut(1, 1500);
					stopCol2Timeout = createStopTimeOut(2, 2000);
					stopCol3Timeout = createStopTimeOut(3, 2500);
					setTimeout(() => {
						const returnedWinnings = GAME.current.stopSpin(
							4,
							GAME.current.SYMBOLS_MAP,
							GAME.current.SYMBOLS
						);
						//Manually reset the state
						STATE = EGameStates.IdleState;
						setWinnings(returnedWinnings);
						setBalance(balance + returnedWinnings);
					}, 3000);
				}, 4000);
				//If the player DID stop the reels
			} else {
				STATE = EGameStates.StoppingState;
				clearTimeout(stopTimeOut);
				clearTimeout(stopCol0Timeout);
				clearTimeout(stopCol1Timeout);
				clearTimeout(stopCol2Timeout);
				clearTimeout(stopCol3Timeout);
				clearTimeout(stopCol4Timeout);
				stopCol0Timeout = createStopTimeOut(0, 250);
				stopCol1Timeout = createStopTimeOut(1, 500);
				stopCol2Timeout = createStopTimeOut(2, 750);
				stopCol3Timeout = createStopTimeOut(3, 1000);
				setTimeout(() => {
					const returnedWinnings = GAME.current.stopSpin(
						4,
						GAME.current.SYMBOLS_MAP,
						GAME.current.SYMBOLS
					);
					//Manually reset the state
					setWinnings(returnedWinnings);
					setBalance(balance + returnedWinnings);
					STATE = EGameStates.IdleState;
				}, 1250);
			}
		}
		setSmallJackpot(smallJackpot + 0.05);
		setLargeJackpot(largeJackpot + 0.1);
	};

	return (
		<div className="App">
			<div className="jackpot-container">
				<div className="jackpot-right">
					<p>JACKPOT</p>
					<p>${smallJackpot.toFixed(2)}</p>
				</div>
				<div className="jackpot-left">
					<p>JACKPOT</p>
					<p>${largeJackpot.toFixed(2)}</p>
				</div>
			</div>
			<div className="bottom-container">
				<div className="balance-container">
					<p className="balance-label">Balance</p>

					<p className="balance-display">${balance.toFixed(2)}</p>
				</div>
				<div className="coins-per-line-container">
					<p className="coins-per-line-label">Coins per line</p>
					<div className="coins-container">
						<button className="coins-btn" onClick={increaseCoinsPerLine}>
							+
						</button>
						{coinsPerLine.toString().length === 3 && (
							<p>
								${coinsPerLine.toString()[0]}.{coinsPerLine.toString()[1]}
								{coinsPerLine.toString()[2]}
							</p>
						)}
						{coinsPerLine < 99 && coinsPerLine === 1.0 && (
							<p>${coinsPerLine}</p>
						)}
						{coinsPerLine < 99 && coinsPerLine.toString().length === 2 && (
							<p>$0.{coinsPerLine}</p>
						)}
						{coinsPerLine < 99 && coinsPerLine.toString().length === 1 && (
							<p>$0.0{coinsPerLine}</p>
						)}
						<button className="coins-btn" onClick={decreaseCoinsPerLine}>
							-
						</button>
					</div>
				</div>
				<div className="spin-btn">
					<button id="spinBtn" className="spinBtn" onClick={spinButtonClick}>
						Spin~
					</button>
				</div>

				<div className="wager-container">
					<p className="wager-label">Wager</p>
					<p>${WAGER.toFixed(2)}</p>
				</div>

				<p className="winnings-label">Winnings</p>
				{winnings !== -1 && (
					<p className="winnings-display">${winnings.toFixed(2)}</p>
				)}
				{winnings === -1 && <p className="winnings-display">$ - - -</p>}
			</div>
			<div className="canvas-container">
				<div className="reel-border-container">
					<ReelBorders></ReelBorders>
				</div>
				{/* <img src="images/border.png" alt="border" className="border"></img> */}
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
			<img id="duchy-winner" src="images/duchy-winner.png" alt="cat preload" />
			<img id="eyrie-winner" src="images/eyrie-winner.png" alt="cat preload" />
			<img
				id="corvid-winner"
				src="images/corvid-winner.png"
				alt="corvid preload"
			/>
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

export default App;
