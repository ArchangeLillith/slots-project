import { EGameStates } from "./Utils/Enum.ts";
import { Symbols } from "./Classes/symbols.ts";
import { FINAL_LOCATIONS_MAP, FinalLocation } from "./Utils/Types.ts";
import InputHandler from "./input.js";

//Global definitions
let SYMBOLS: Symbols[] = [];
const SYMBOL_HEIGHT: number = 200;
let FIRST_TIME = true;
const SYMBOLS_MAP: { [key: number]: Symbols[] } = {};

export class Game {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	UI: any;
	input: any;
	debug: boolean;
	score: number;
	gameOver: boolean;
	MASTER_SYMBOL_LIST: any;
	constructor(
		canvas: HTMLCanvasElement,
		width: number,
		height: number,
		MASTER_SYMBOL_LIST: Symbols[]
	) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.input = new InputHandler(this);
		this.debug = true;
		this.score = 0;
		this.gameOver = false;
		this.MASTER_SYMBOL_LIST = MASTER_SYMBOL_LIST;
	}

	update(context: any, state: string) {
		// console.log(`STATE`, state);
		// console.log("symbols.length = ", SYMBOLS.length);

		//Pulls bottom row to the top for the object pooling
		this.handleOffscreenSymbols(context);

		//Applies speed to the symbols if the check passes
		if (
			state === EGameStates.SpinningState ||
			state === EGameStates.StoppingState
		) {
			//*SPEED HANLDER PASSED HERE
			for (const symbol of SYMBOLS) {
				symbol.update(context, 55);
			}
		} else {
			//Otherwise draws symbols as static because of the default speed value as 0
			for (const symbol of SYMBOLS) {
				symbol.update(context);
			}
		}
	}

	spin(column: number) {
		for (let symbol of SYMBOLS_MAP[column]) {
			symbol.canMove = true;
		}
	}

	stopSpin(column: number) {
		//Grabs the symbol from the column passed in
		for (let symbol of SYMBOLS_MAP[column]) {
			//Checks to see if it has a row index of i, and if so, sets the final location
			for (let i = 0; i < 5; i++) {
				if (symbol.rowIndex === i) {
					symbol.y = (FINAL_LOCATIONS_MAP[i] as FinalLocation)[column].y;
					symbol.x = (FINAL_LOCATIONS_MAP[i] as FinalLocation)[column].x;
				}
			}
			symbol.canMove = false;
		}
		//? This will need to change if the game mode changes, or perhaps there's a better way to do this
		if (column === 4) {
			this.grabFinalSymbols();
		}
	}

	grabFinalSymbols() {
		let topRow = [];
		for (let i = 0; i <= 5; i++) {
			topRow.push(SYMBOLS[i]);
		}
		console.log(
			`TOP ROW`,
			topRow[0].image,
			topRow[1].image,
			topRow[2].image,
			topRow[3].image,
			topRow[4].image
		);
	}

	// Handler for symbols that go off canvas
	handleOffscreenSymbols(canvas: HTMLCanvasElement) {
		//Loops over all the elements
		for (let i = 0; i < SYMBOLS.length; i++) {
			//Check if the symbol is off the canvas
			if (SYMBOLS[i].y > this.canvas.height + SYMBOL_HEIGHT) {
				//Gets a random number to index by
				let math = Math.floor(Math.random() * this.MASTER_SYMBOL_LIST.length);
				//Saves the X value of the old symbol to use in the new one
				let x = SYMBOLS[i].x;
				//Overwrites the old symbol with a brand new one using the randomization from the earlier math variable
				SYMBOLS[i] = new this.MASTER_SYMBOL_LIST[math](
					canvas,
					SYMBOLS[i].colIndex,
					SYMBOLS[i].rowIndex
					//-200 because that's the offscreen value every symbol should start at
				);
				//Sets the X and Y coords to what is expected, overwriting and not caring about what they were when the new symbol was made
				SYMBOLS[i].x = x;
				SYMBOLS[i].y = -200;
				SYMBOLS[i].canMove = true;
				//Zach this isn't working with the update to the symbols map, it DOES (sorta) work with the below commented out line.
				// SYMBOLS_MAP[SYMBOLS[i].colIndex].push(SYMBOLS[i]);
				// let indexInMap: number;
				// console.log(`SYMBOLS at ${i}:`, SYMBOLS[i]);
				for (let j = 0; j < Object.values(SYMBOLS_MAP).length; j++) {
					if (
						SYMBOLS_MAP[0][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[0][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[0][j] = SYMBOLS[i];
						// console.log(`SYMBOLS MAP MATCHES,`, SYMBOLS_MAP[0][j], SYMBOLS[i]);
						// console.log(`MAP COLUMN IS ${SYMBOLS_MAP[0][j].colIndex}`);
						// console.log(`MAIN COLUMN IS ${SYMBOLS[i].colIndex}`);
					} else if (
						SYMBOLS_MAP[1][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[1][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[1][j] = SYMBOLS[i];
						// console.log(`SYMBOLS MAP MATCHES,`, SYMBOLS_MAP[1][j], SYMBOLS[i]);
						// console.log(`MAP COLUMN IS ${SYMBOLS_MAP[1][j].colIndex}`);
						// console.log(`MAIN COLUMN IS ${SYMBOLS[i].colIndex}`);
					} else if (
						SYMBOLS_MAP[2][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[2][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[2][j] = SYMBOLS[i];
						// console.log(`SYMBOLS MAP MATCHES,`, SYMBOLS_MAP[2][j], SYMBOLS[i]);
						// console.log(`MAP COLUMN IS ${SYMBOLS_MAP[2][j].colIndex}`);
						// console.log(`MAIN COLUMN IS ${SYMBOLS[i].colIndex}`);
					} else if (
						SYMBOLS_MAP[3][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[3][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[3][j] = SYMBOLS[i];
						// console.log(`SYMBOLS MAP MATCHES,`, SYMBOLS_MAP[3][j], SYMBOLS[i]);
						// console.log(`MAP COLUMN IS ${SYMBOLS_MAP[3][j].colIndex}`);
						// console.log(`MAIN COLUMN IS ${SYMBOLS[i].colIndex}`);
					} else if (
						SYMBOLS_MAP[4][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[4][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[4][j] = SYMBOLS[i];
						// console.log(`SYMBOLS MAP MATCHES,`, SYMBOLS_MAP[4][j], SYMBOLS[i]);
						// console.log(`MAP COLUMN IS ${SYMBOLS_MAP[4][j].colIndex}`);
						// console.log(`MAIN COLUMN IS ${SYMBOLS[i].colIndex}`);
					}
				}

				// indexInMap = Object.values(SYMBOLS_MAP[j]).indexOf(SYMBOLS[i]);
				// if (indexInMap) SYMBOLS_MAP[j][indexInMap] = SYMBOLS[i];
				// console.log(`SYMBOLS_MAP `, SYMBOLS_MAP);
			}
		}
	}

	/**Called externally by the first animation loop, calls to the Symbols class and calls their draw function. This is a seperate function because not all game states require a draw method, ie idleState
	 *
	 * @param context - important to the function to know what it's drawing on
	 */
	initialize() {
		if (FIRST_TIME) {
			this.addPieces(this.canvas, 5, 5);
			this.makeMap();
			FIRST_TIME = false;
		} else return;
	}

	/**The generation function for the pieces. First it assigns a count variable for the rows (i), then iterating over each symbol with this variable and adding to the count to log where it is. Then it assigns the variable (j) to columns and doing the same thing, which will output a set of coordinates (i,j) to the function to tell the computer where symbols are in a grid layout.
	 *
	 * This is modular, and why we can change it from a 5x1 to whatever we want, because the variables will stop when they're over the size of the number of rows/columns. We use over, not equal to, because if we did we'd be missing a final piece.
	 *
	 * Finally, a random number is generated to pick a symbol in the MASTER_SYMBOL_LIST that contains 100 symbols, their number added being dependant on the specific symbol's class parameter "symbolFrequency". This reflects a less processing intensive way of generating a quasi random symbol, using a static arrray and pulling from that as the percentages in it are already predetermined. The symbol is picked via random number and added to the SYMBOLS array, the array that's displayed on the screen for the user to see.
	 *
	 * @param canvas - Referring to the base canvas, used when a symbol is pushed to the SYMBOLS array so that symbol knows where it's supposed to be seen
	 * @param rows - The number of rows the function should generate.
	 * @param cols - The number of columns the function should generate.
	 */
	addPieces(
		canvas: HTMLCanvasElement,
		piecesPerRow: number,
		piecesPerCol: number
	) {
		//Rows assigned here
		for (let i = 0; i < piecesPerRow; i++) {
			//Columns assigned here
			for (let j = 0; j < piecesPerCol; j++) {
				//Pushing to the array now, filling the predefined array.
				let math = Math.floor(Math.random() * this.MASTER_SYMBOL_LIST.length);
				//REFACTOR add this to a variable and make this also push to the map array here instead of the function at the bottom, need to initalize the map with 2d arrays
				SYMBOLS.push(new this.MASTER_SYMBOL_LIST[math](canvas, i, j));
				// console.log(SYMBOLS);
			}
		}
	}

	makeMap() {
		for (let i = 0; i < SYMBOLS.length / 5; i++) {
			let colArray: Symbols[] = SYMBOLS.filter(
				(symbol) => symbol.colIndex === i
			);
			SYMBOLS_MAP[i] = colArray;
		}
	}
}
