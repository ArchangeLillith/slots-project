import { Symbols } from "../Classes/symbols.ts";
import { FINAL_LOCATIONS_MAP } from "./Types.ts";

export function createArrays(
	canvas: HTMLCanvasElement,
	piecesPerRow: number,
	piecesPerCol: number,
	MASTER_SYMBOL_LIST: any
): { SYMBOLS_ARRAY: Symbols[]; SYMBOLS_MAP: Symbols[][] } {
	const SYMBOLS_ARRAY = [];
	const SYMBOLS_MAP = [];

	/**The generation function for the pieces. First it assigns a count variable for the rows (i), then iterating over each symbol with this variable and adding to the count to log where it is. Then it assigns the variable (j) to columns and doing the same thing, which will output a set of coordinates (i,j) to the function to tell the computer where symbols are in a grid layout.
	 *
	 * This is modular, and why we can change it from a 5x1 to whatever we want, because the variables will stop when they're over the size of the number of rows/columns. We use over, not equal to, because if we did we'd be missing a final piece.
	 *
	 * Finally, a random number is generated to pick a symbol in the MASTER_SYMBOL_LIST that contains 100 symbols, their number added being dependant on the specific symbol's class parameter "symbolFrequency". This reflects a less processing intensive way of generating a quasi random symbol, using a static arrray and pulling from that as the percentages in it are already predetermined. The symbol is picked via random number and added to the SYMBOLS array, the array that's displayed on the screen for the user to see.
	 *
	 * @param canvas - Referring to the base canvas, used when a symbol is pushed to the SYMBOLS array so that symbol knows where it's supposed to be seen
	 * @param piecesPerRow - The number of rows the function should generate.
	 * @param piecesPerCol - The number of columns the function should generate.
	 */
	//Handle to refer to the symbol we are making in any instance of the loop
	let symbolCounter = 0;
	//Rows assigned here
	for (let i = 0; i < piecesPerRow; i++) {
		//Columns assigned here
		for (let j = 0; j < piecesPerCol; j++) {
			//Pushing to the array now, filling the predefined array.
			let math = Math.floor(Math.random() * MASTER_SYMBOL_LIST.length);
			//REFACTOR add this to a variable and make this also push to the map array here instead of the function at the bottom, need to initalize the map with 2d arrays
			SYMBOLS_ARRAY.push(new MASTER_SYMBOL_LIST[math](canvas, i, j));
			createFinalLocation(
				SYMBOLS_ARRAY[symbolCounter].x,
				SYMBOLS_ARRAY[symbolCounter].y,
				i,
				j
			);
			symbolCounter++;
		}
	}

	//The map making loop
	for (let i = 0; i < SYMBOLS_ARRAY.length / 5; i++) {
		let colArray: Symbols[] = SYMBOLS_ARRAY.filter(
			(symbol) => symbol.colIndex === i
		);
		SYMBOLS_MAP[i] = colArray;
	}
	return { SYMBOLS_ARRAY, SYMBOLS_MAP };
}

/**
 *
 * @param x - The X location on the canvas
 * @param y - The Y location on the canvas
 * @param row - The handle for the row as an index
 * @param column - The handle for the column as an index
 * Creates the final location X,Y coords based on the original 5X5 grid and where they were before the spin
 */
function createFinalLocation(
	x: number,
	y: number,
	row: number,
	column: number
) {
	FINAL_LOCATIONS_MAP[row][column] = { x, y };
}
