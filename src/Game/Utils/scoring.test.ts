//To start this, navigate to the parent folder and run the file like "tsx scoring.test.ts"
//If tests pass, the console logs will hit and return a success message
//Otherwise, the program will error out
import { Otter, Cat, Corvid, Eyrie, Duchy, Alliance } from "../Classes/symbols";
import { calcFinalSymbols } from "./calcFinalSymbols";
//Sets up a dummy document for us to override the image in the symbol constructor
global.document = {
	getElementById: () => {},
} as any;

//Test: All winning lines
//We build the mock array to contain all of one symbol to ensure some sort of winnings, showing that our algorithm does return.
//For 90%, return should be 8400
const MOCK_SYMBOLS_ALL_SAME: any = [];
for (let i = 0; i <= 25; i++)
	MOCK_SYMBOLS_ALL_SAME.push(new Otter({} as any, 1, 1));
const winnings_all = calcFinalSymbols(MOCK_SYMBOLS_ALL_SAME);
console.log(`With 90%, this should be 8400:`, winnings_all);

//Test: No winnings lines
//Build the mock array
const MOCK_SYMBOLS_ALL_DIFFERENT: any = [];
for (let i = 0; i < 5; i++)
	MOCK_SYMBOLS_ALL_DIFFERENT.push(new Cat({} as any, 1, 1));
for (let i = 0; i < 5; i++)
	MOCK_SYMBOLS_ALL_DIFFERENT.push(new Corvid({} as any, 1, 1));
for (let i = 0; i < 5; i++)
	MOCK_SYMBOLS_ALL_DIFFERENT.push(new Duchy({} as any, 1, 1));
for (let i = 0; i < 5; i++)
	MOCK_SYMBOLS_ALL_DIFFERENT.push(new Otter({} as any, 1, 1));
for (let i = 0; i < 5; i++)
	MOCK_SYMBOLS_ALL_DIFFERENT.push(new Alliance({} as any, 1, 1));
const winnings_none = calcFinalSymbols(MOCK_SYMBOLS_ALL_DIFFERENT);
console.log(`This should be 0:`, winnings_none);
