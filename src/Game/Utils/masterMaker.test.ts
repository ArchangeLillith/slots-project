//To start this, navigate to the parent folder and run the file like "tsx masterMaker.test.ts"
//If tests pass, the console logs will hit and return a success message
//Otherwise, the program will error out
import { ESymbolFrequency90 } from "./Enum";
import { masterArrayMaker } from "./masterMaker";
//Sets up a dummy document for us to override the image in the symbol constructor
global.document = {
	getElementById: () => {},
} as any;

//Test: Length check on master array, nothing works right if it's not exactly 100
const MASTER_ARRAY_LENGTH_CHECK = masterArrayMaker();
if (MASTER_ARRAY_LENGTH_CHECK.length === 100)
	console.log("Success, length of array of correct");
else throw new Error("The length  is not 100");

//Test: The percent expected vs reality of symbols in the master array
let otterCounter = 0;
let catCounter = 0;
let eyrieCounter = 0;
let corvidCounter = 0;
let allianceCounter = 0;
let duchyCounter = 0;
//Runs the master array maker
const MASTER_ARRAY = masterArrayMaker();
//Loops over the master array and adds symbols to their respective counts
for (let j = 0; j < MASTER_ARRAY.length; j++) {
	switch (new MASTER_ARRAY[j]({} as any, 1, 1).symbolName) {
		case "otter":
			otterCounter++;
			break;
		case "cat":
			catCounter++;
			break;
		case "eyrie":
			eyrieCounter++;
			break;
		case "corvid":
			corvidCounter++;
			break;
		case "alliance":
			allianceCounter++;
			break;
		case "duchy":
			duchyCounter++;
			break;
	}
}

let otterAverage = otterCounter / 100;
let catAverage = catCounter / 100;
let eyrieAverage = eyrieCounter / 100;
let corvidAverage = corvidCounter / 100;
let allianceAverage = allianceCounter / 100;
let duchyAverage = duchyCounter / 100;
if (
	otterAverage <= ESymbolFrequency90.Otter - 0.02 &&
	otterAverage >= ESymbolFrequency90.Otter + 0.02
)
	throw new Error(
		`Otter is not in a 2% range, it's average is ${otterAverage} insead of the expected ${ESymbolFrequency90.Otter} +- 2%.`
	);
if (
	catAverage <= ESymbolFrequency90.Cat - 0.02 &&
	catAverage >= ESymbolFrequency90.Cat + 0.02
)
	throw new Error(
		`Cat is not in a 2% range, it's average is ${catAverage} insead of the expected ${ESymbolFrequency90.Cat} +- 2%.`
	);
if (
	eyrieAverage <= ESymbolFrequency90.Eyrie - 0.02 &&
	eyrieAverage >= ESymbolFrequency90.Eyrie + 0.02
)
	throw new Error(
		`Eyrie is not in a 2% range, it's average is ${eyrieAverage} insead of the expected ${ESymbolFrequency90.Eyrie} +- 2%.`
	);
if (
	corvidAverage <= ESymbolFrequency90.Corvid - 0.02 &&
	corvidAverage >= ESymbolFrequency90.Corvid + 0.02
)
	throw new Error(
		`Corvid is not in a 2% range, it's average is ${corvidAverage} insead of the expected ${ESymbolFrequency90.Corvid} +- 2%.`
	);
if (
	allianceAverage <= ESymbolFrequency90.Alliance - 0.02 &&
	allianceAverage >= ESymbolFrequency90.Alliance + 0.02
)
	throw new Error(
		`Alliance is not in a 2% range, it's average is ${allianceAverage} insead of the expected ${ESymbolFrequency90.Alliance} +- 2%.`
	);
if (
	duchyAverage <= ESymbolFrequency90.Duchy - 0.02 &&
	duchyAverage >= ESymbolFrequency90.Duchy + 0.02
)
	throw new Error(
		`Duchy is not in a 2% range, it's average is ${duchyAverage} insead of the expected ${ESymbolFrequency90.Duchy} +- 2%.`
	);
else
	console.log(
		`Success, all averages are within a 2% range of their expected average!`
	);
