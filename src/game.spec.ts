import { Symbols } from "./Game/Classes/symbols";
//What tests do we want?
//A test that runs X amount of games and reports the average, least and most winnings

//Not a typical test, this is for testing the math behind the doc that Rackie wrote for me so it just runs the machine however many times is determined in the number of spins variable and outputs to the console numbers that will show if the math was correct
export default function runTestSpins(GAME: any) {
	let returnedWinnings: number[] = [];
	let TEST_SYMBOLS_MAP: Symbols[][] = [];
	const numberOfSpins = 100;
	//Outer for loop spinning a determined number of times
	for (let h = 0; h < numberOfSpins; h++) {
		//Has to be determined here so we wipe the array for the next go around
		let SYMBOLS = [];
		//The start of initializing new pieces
		let symbolCounter = 0;
		for (let i = 0; i < 5; i++) {
			//Columns assigned here
			for (let j = 0; j < 5; j++) {
				//Pushing to the array now, filling the predefined array.
				let math = Math.floor(Math.random() * GAME.MASTER_SYMBOL_LIST.length);
				SYMBOLS.push(new GAME.MASTER_SYMBOL_LIST[math](GAME.canvas, i, j));
				GAME.createFinalLocation(
					SYMBOLS[symbolCounter].x,
					SYMBOLS[symbolCounter].y,
					i,
					j
				);
				symbolCounter++;
			}
		}
		//Make the test symbols map for scoring
		for (let k = 0; k < SYMBOLS.length / 5; k++) {
			let colArray: Symbols[] = SYMBOLS.filter(
				(symbol) => symbol.colIndex === k
			);
			TEST_SYMBOLS_MAP[k] = colArray;
		}
		//Starting the spin
		GAME.spin(0);
		GAME.spin(1);
		GAME.spin(2);
		GAME.spin(3);
		GAME.spin(4);

		GAME.stopSpin(0, TEST_SYMBOLS_MAP, SYMBOLS);
		GAME.stopSpin(1, TEST_SYMBOLS_MAP, SYMBOLS);
		GAME.stopSpin(2, TEST_SYMBOLS_MAP, SYMBOLS);
		GAME.stopSpin(3, TEST_SYMBOLS_MAP, SYMBOLS);
		//Pushing the winnings into the array to capture the score
		returnedWinnings.push(GAME.stopSpin(4, TEST_SYMBOLS_MAP, SYMBOLS));
	}
	const average = (returnedWinnings: number[]) =>
		returnedWinnings.reduce((p: number, c: number) => p + c, 0) /
		returnedWinnings.length;
	const averageFromWinnings = average(returnedWinnings);
	const highest = returnedWinnings.filter((a, b) => b < a)[0];
	const lowest = returnedWinnings.filter((a, b) => a < b)[0];
	console.log("Winnings array:", returnedWinnings);
	console.log("Average of winnings:", averageFromWinnings);
	console.log("Highest:", highest);
	console.log("Lowest:", lowest);
}
