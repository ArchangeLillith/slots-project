import { Symbols } from "../Classes/symbols";
import scoringAlgorithm from "./scoring";

/**
 *
 * @param SYMBOLS - The current SYMBOLS array of this game spin
 * Takes the SYMBOL array and populates a 2D array based on the lines in play
 * @returns winnings- A non-negative number that reflects the score of the spin
 *REFACTOR we'll need this to take in the lines that were chosen from the frontend as well and modify therefore
 */
export function calcFinalSymbols(SYMBOLS: Symbols[]) {
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

	const scoringArray = [];
	//Color associate with a graphic that lays out the lines visually for reference

	//RED
	scoringArray.push(topRow);
	scoringArray.push(midRow);
	scoringArray.push(botRow);
	//DARK BLUE
	scoringArray.push([topRow[0], topRow[1], midRow[2], topRow[3], topRow[4]]);
	scoringArray.push([midRow[0], midRow[1], topRow[2], midRow[3], midRow[4]]);
	scoringArray.push([botRow[0], botRow[1], midRow[2], botRow[3], botRow[4]]);
	scoringArray.push([midRow[0], midRow[1], botRow[2], midRow[3], midRow[4]]);
	//MAGENTA
	scoringArray.push([topRow[0], midRow[1], topRow[2], midRow[3], topRow[4]]);
	scoringArray.push([botRow[0], midRow[1], botRow[2], midRow[3], botRow[4]]);
	scoringArray.push([midRow[0], topRow[1], midRow[2], topRow[3], midRow[4]]);
	scoringArray.push([midRow[0], botRow[1], midRow[2], botRow[3], midRow[4]]);
	//ORANGE
	scoringArray.push([midRow[0], topRow[1], midRow[2], botRow[3], midRow[4]]);
	scoringArray.push([midRow[0], botRow[1], midRow[2], topRow[3], midRow[4]]);
	//GREEN
	scoringArray.push([topRow[0], midRow[1], midRow[2], midRow[3], topRow[4]]);
	scoringArray.push([botRow[0], midRow[1], midRow[2], midRow[3], botRow[4]]);
	scoringArray.push([midRow[0], topRow[1], topRow[2], topRow[3], midRow[4]]);
	scoringArray.push([midRow[0], botRow[1], botRow[2], botRow[3], midRow[4]]);
	//CYAN
	scoringArray.push([topRow[0], midRow[1], botRow[2], midRow[3], topRow[4]]);
	scoringArray.push([botRow[0], midRow[1], topRow[2], midRow[3], botRow[4]]);
	//YELLOW
	scoringArray.push([topRow[0], topRow[1], midRow[2], botRow[3], botRow[4]]);
	scoringArray.push([botRow[0], botRow[1], midRow[2], topRow[3], topRow[4]]);
	//? When implimenting another game there should be a check here to make sure the lines for scoring are correct
	let winnings = scoringAlgorithm(scoringArray);
	return winnings;
}
