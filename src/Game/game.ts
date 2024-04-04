import { EGameStates } from "./Utils/Enum.ts";
import { Symbols } from "./Classes/symbols.ts";
import { FINAL_LOCATIONS_MAP, FinalLocation } from "./Utils/Types.ts";
import { calcFinalSymbols } from "./Utils/calcFinalSymbols.ts";

//Global definitions
const SYMBOL_HEIGHT: number = 200;

export class Game {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	UI: any;
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

	/**
	 * @param context - The canvas we're drawing on
	 * @param state - The state we're in
	 * The game update method that handles the symbols, calling methods on them to make the game function correctly
	 * */
	update(
		context: any,
		state: string,
		SYMBOLS: Symbols[],
		SYMBOLS_MAP: Symbols[][]
	) {
		//Pulls bottom row to the top for the object pooling and changes the symbol
		this.handleOffscreenSymbols(context, SYMBOLS, SYMBOLS_MAP);
		//Applies speed to the symbols if the check passes
		if (
			state === EGameStates.SpinningState ||
			state === EGameStates.StoppingState
		) {
			for (const symbol of SYMBOLS) {
				//*SPEED HANLDER PASSED HERE
				symbol.update(context, 55);
			}
		} else {
			//Otherwise draws symbols as static because of the default speed value as 0 on symbol.update
			for (const symbol of SYMBOLS) {
				symbol.update(context);
			}
		}
	}

	/**
	 * @param column - The column we're going to spin
	 * Allows all symbols on the passed in column to spin
	 * */
	spin(column: number, SYMBOLS_MAP: Symbols[][]) {
		for (let symbol of SYMBOLS_MAP[column]) {
			symbol.canMove = true;
		}
	}

	/**
	 * @param column - The column we're going to spin
	 * Sets the final X,Y canvas location for each of the symbols based on what was lifted and added dynamically into the enum, then calls to start the process of scoring
	 * @returns winnings - The amount won on that spin, can be any number greater than or equal to 0
	 * */
	stopSpin(column: number, SYMBOLS_MAP: Symbols[][], SYMBOLS: Symbols[]) {
		//Grabs the symbol from the column passed in
		SYMBOLS_MAP[column].forEach((symbol: Symbols, index: number) => {
			//Checks to see if it has a row index of i, and if so, sets the final location
			symbol.y = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].y;
			symbol.x = (FINAL_LOCATIONS_MAP[column] as FinalLocation)[index].x;
			symbol.canMove = false;
		});
		//? This will need to change if the game mode changes, or perhaps there's a better way to do this
		//We only want to score once the final column has stopped moving
		if (column === 4) {
			//This makes the 2D array for scoring then calls the scoring algorithm on it, then returns the winnings here
			let winnings = calcFinalSymbols(SYMBOLS);
			return winnings;
		}
	}

	// Handler for symbols that go off canvas
	handleOffscreenSymbols(
		canvas: HTMLCanvasElement,
		SYMBOLS: Symbols[],
		SYMBOLS_MAP: Symbols[][]
	) {
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
}
