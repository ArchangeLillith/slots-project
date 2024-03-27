import { EGameStates } from "./Utils/Enum.ts";
import { Symbols } from "./Classes/symbols.ts";
import { FINAL_LOCATIONS_MAP, FinalLocation } from "./Utils/Types.ts";
import scoringAlgorithm from "./Utils/scoring.ts";

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
		this.debug = true;
		this.score = 0;
		this.gameOver = false;
		this.MASTER_SYMBOL_LIST = MASTER_SYMBOL_LIST;
	}

	update(context: any, state: string) {
		//Pulls bottom row to the top for the object pooling
		this.handleOffscreenSymbols(context);
		//* we can put the tween here in our update loop
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

	stopSpin(
		column: number,
		TEST_SYMBOLS_MAP: Symbols[][],
		TEST_SYMBOLS: Symbols[]
	) {
		if (!TEST_SYMBOLS_MAP) {
			//Grabs the symbol from the column passed in
			SYMBOLS_MAP[column].forEach((symbol: Symbols, index: number) => {
				//Checks to see if it has a row index of i, and if so, sets the final location
				symbol.y = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].y;
				symbol.x = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].x;

				symbol.canMove = false;
			});
			//? This will need to change if the game mode changes, or perhaps there's a better way to do this
			if (column === 4) {
				let winnings = this.grabFinalSymbols(SYMBOLS);
				return winnings;
			}
		} else {
			//* TESTING
			//Grabs the symbol from the column passed in
			TEST_SYMBOLS_MAP[column].forEach((symbol: Symbols, index: number) => {
				//Checks to see if it has a row index of i, and if so, sets the final location
				symbol.y = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].y;
				symbol.x = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].x;

				symbol.canMove = false;
			});
			if (column === 4) {
				let winnings = this.grabFinalSymbols(TEST_SYMBOLS);
				return winnings;
			}
		}
	}

	//? this will also need to change if the game mode changes
	grabFinalSymbols(SYMBOLS: Symbols[]) {
		let topRow = [];
		let midRow = [];
		let botRow = [];
		for (let i = 1; i < SYMBOLS.length; i += 5) {
			topRow.push(SYMBOLS[i]);
		}
		for (let i = 2; i < SYMBOLS.length; i += 5) {
			midRow.push(SYMBOLS[i]);
		}
		for (let i = 3; i < SYMBOLS.length; i += 5) {
			botRow.push(SYMBOLS[i]);
		}
		//? When implimenting another game there should be a check here to make sure the lines for scoring are correct
		//REFACTOR this is going to thave if checks depending on which lines the player has selected
		const scoringArray = [];
		//Color associate with a graphic that lays out the lines visually for reference

		//RED
		scoringArray.push(topRow);
		scoringArray.push(midRow);
		scoringArray.push(botRow);
		//DARK BLUE
		scoringArray.push(topRow[0], topRow[1], midRow[2], topRow[3], topRow[4]);
		scoringArray.push(midRow[0], midRow[1], topRow[2], midRow[3], midRow[4]);
		scoringArray.push(botRow[0], botRow[1], midRow[2], botRow[3], botRow[4]);
		scoringArray.push(midRow[0], midRow[1], botRow[2], midRow[3], midRow[4]);
		//MAGENTA
		scoringArray.push(topRow[0], midRow[1], topRow[2], midRow[3], topRow[4]);
		scoringArray.push(botRow[0], midRow[1], botRow[2], midRow[3], botRow[4]);
		scoringArray.push(midRow[0], topRow[1], midRow[2], topRow[3], midRow[4]);
		scoringArray.push(midRow[0], botRow[1], midRow[2], botRow[3], midRow[4]);
		//ORANGE
		scoringArray.push(midRow[0], topRow[1], midRow[2], botRow[3], midRow[4]);
		scoringArray.push(midRow[0], botRow[1], midRow[2], topRow[3], midRow[4]);
		//GREEN
		scoringArray.push(topRow[0], midRow[1], midRow[2], midRow[3], topRow[4]);
		scoringArray.push(botRow[0], midRow[1], midRow[2], midRow[3], botRow[4]);
		scoringArray.push(midRow[0], topRow[1], topRow[2], topRow[3], midRow[4]);
		scoringArray.push(midRow[0], botRow[1], botRow[2], botRow[3], midRow[4]);
		//CYAN
		scoringArray.push(topRow[0], midRow[1], botRow[2], midRow[3], topRow[4]);
		scoringArray.push(botRow[0], midRow[1], topRow[2], midRow[3], botRow[4]);
		//YELLOW
		scoringArray.push(topRow[0], topRow[1], midRow[2], botRow[3], botRow[4]);
		scoringArray.push(botRow[0], botRow[1], midRow[2], topRow[3], topRow[4]);

		let winnings = scoringAlgorithm(scoringArray);
		console.log(`winnings ${winnings}`);
		return winnings;
	}

	// Handler for symbols that go off canvas
	handleOffscreenSymbols(canvas: HTMLCanvasElement) {
		//Loops over all the elements
		for (let i = 0; i < SYMBOLS.length; i++) {
			//Check if the symbol is off the canvas
			if (SYMBOLS[i].y > this.canvas.height + SYMBOL_HEIGHT) {
				//Gets a random number to index by
				let randomNumber = Math.floor(
					Math.random() * this.MASTER_SYMBOL_LIST.length
				);
				//Saves the X value of the old symbol to use in the new one
				let x = SYMBOLS[i].x;
				//Overwrites the old symbol with a brand new one using the randomization from the earlier math variable
				SYMBOLS[i] = new this.MASTER_SYMBOL_LIST[randomNumber](
					canvas,
					SYMBOLS[i].colIndex,
					SYMBOLS[i].rowIndex
				);

				//Sets the X and Y coords to what is expected, overwriting and not caring about what they were when the new symbol was made
				SYMBOLS[i].x = x;
				//-200 because that's the offscreen value every symbol should start at
				SYMBOLS[i].y = -200;
				SYMBOLS[i].canMove = true;
				//Updates the symbols map to match the SYMBOLS array
				for (let j = 0; j < Object.values(SYMBOLS_MAP).length; j++) {
					if (
						SYMBOLS_MAP[0][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[0][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[0][j] = SYMBOLS[i];
					} else if (
						SYMBOLS_MAP[1][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[1][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[1][j] = SYMBOLS[i];
					} else if (
						SYMBOLS_MAP[2][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[2][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[2][j] = SYMBOLS[i];
					} else if (
						SYMBOLS_MAP[3][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[3][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[3][j] = SYMBOLS[i];
					} else if (
						SYMBOLS_MAP[4][j].colIndex === SYMBOLS[i].colIndex &&
						SYMBOLS_MAP[4][j].rowIndex === SYMBOLS[i].rowIndex
					) {
						SYMBOLS_MAP[4][j] = SYMBOLS[i];
					}
				}
			}
		}
	}

	/**Called externally by the first animation loop, calls to the Symbols class and calls their draw function. This is a seperate function because not all game states require a draw method, ie idleState
	 *
	 * @param context - important to the function to know what it's drawing on
	 */
	initialize(test: boolean) {
		if (FIRST_TIME) {
			this.addPieces(this.canvas, 5, 5);
			this.makeMap();
			if (!test) FIRST_TIME = false;
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
		let symbolCounter = 0;
		for (let i = 0; i < piecesPerRow; i++) {
			//Columns assigned here
			for (let j = 0; j < piecesPerCol; j++) {
				//Pushing to the array now, filling the predefined array.
				let math = Math.floor(Math.random() * this.MASTER_SYMBOL_LIST.length);
				//REFACTOR add this to a variable and make this also push to the map array here instead of the function at the bottom, need to initalize the map with 2d arrays
				SYMBOLS.push(new this.MASTER_SYMBOL_LIST[math](canvas, i, j));
				this.createFinalLocation(
					SYMBOLS[symbolCounter].x,
					SYMBOLS[symbolCounter].y,
					i,
					j
				);
				symbolCounter++;
			}
		}
	}

	createFinalLocation(x: number, y: number, row: number, column: number) {
		FINAL_LOCATIONS_MAP[row][column] = { x, y };
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
