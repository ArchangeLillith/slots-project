import { Ruins } from "./ruins";

/**Currently half psuedo code for how the scoring will work.
 *
 */
export class Scoring {
	constructor(game) {
		this.game = game;
	}

	/**The main scoring algorithm. Takes in a symbol from the SYMBOLS array and determines if it matches any in the second row. This is the first check run because if there are no matching symbols or wilds, the run is dead - unless there are ruins.
	 *
	 * @param symbol - Specific symbol from the SYMBOLS array
	 * @param SYMBOLS - The array of displayed symbols
	 */
	initialColumnCheck(symbol, SYMBOLS) {
		//if the symbol does not match any other, and if it does not match any wilds (otters)
		if (symbol !== symbol || symbol !== otter) {
			//but there ARE ruins then we run ONLY the ruins algorithm
			if (checkingForRuins()) {
				console.log("trigger for ruins algorithm");
			}
			//and if there aren't three ruins, there are no scoring matches on the board
			else {
				console.log("not a winner :(");
			}

			//if symbol doesn't match and there are no ruins
			console.log("dead run");
		}
	}
}

function checkingForRuins(array) {
	for (i = 0; i > 3; i++) {
		if (ruins) {
			if (ruins >= 3) {
				console.log("winner");
			} else {
				console.log("not a winner");
			}
		}
	}
}
