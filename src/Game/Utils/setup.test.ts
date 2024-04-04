//To start this, navigate to the parent folder and run the file like "tsx setup.test.ts"
//If tests pass, the console logs will hit and return a success message
//Otherwise, the program will error out
import { ESymbolFrequency90 } from "./Enum";
import { createArrays } from "./setup";
import {
	Otter,
	Eyrie,
	Cat,
	Corvid,
	Duchy,
	Alliance,
	Symbols,
} from "../Classes/symbols";
import { SymbolClassConstructors } from "./Types";
//Mock the document
global.document = {
	getElementById: () => {},
} as any;
//Make the mock MASTER array to pass in based on the Enum
const MASTER_ARRAY_MOCK_90: SymbolClassConstructors = [];
for (let i = 0; i <= ESymbolFrequency90.Otter * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Otter);
}
for (let i = 0; i <= ESymbolFrequency90.Cat * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Cat);
}
for (let i = 0; i <= ESymbolFrequency90.Eyrie * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Eyrie);
}
for (let i = 0; i <= ESymbolFrequency90.Corvid * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Corvid);
}
for (let i = 0; i <= ESymbolFrequency90.Alliance * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Alliance);
}
for (let i = 0; i <= ESymbolFrequency90.Duchy * 100; i++) {
	MASTER_ARRAY_MOCK_90.push(Duchy);
}

//Set how many times we want this to run
let numberOfRunTimes = 10;
//Make the counters for the different symbols
let otterCounter = 0;
let catCounter = 0;
let eyrieCounter = 0;
let corvidCounter = 0;
let allianceCounter = 0;
let duchyCounter = 0;
//Start the overall loop
for (let i = 0; i <= numberOfRunTimes; i++) {
	//Make the array to test from the mock
	const ARRAY: Symbols[] = createArrays(
		{} as any,
		5,
		5,
		MASTER_ARRAY_MOCK_90
	).SYMBOLS_ARRAY;

	//Test: Ensuring that the ARRAY is 25 length, denoting a 5X5 grid on the screen
	if (ARRAY.length !== 25) {
		throw new Error(`ARRAY.length is ${ARRAY.length}, not the expected 25`);
	}

	//Test: This takes the array made in setup to ensure that the average percent of different symbols is as intended based on the Enum
	//Loop over the symbol at J for each array and add increase that counter
	for (let j = 0; j < ARRAY.length; j++) {
		switch (ARRAY[j].symbolName) {
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
}

//Find averages by taking the number of otters divded by the run times times by 25 as that's how many symbols are in each run
let otterAverage = otterCounter / (numberOfRunTimes * 25);
console.log(
	`Otter average is ${otterAverage}, expected ${ESymbolFrequency90.Otter} +- 2%.`
);
let catAverage = catCounter / (numberOfRunTimes * 25);
console.log(
	`Cat average is ${catAverage}, expected ${ESymbolFrequency90.Cat} +- 2%.`
);
let eyrieAverage = eyrieCounter / (numberOfRunTimes * 25);
console.log(
	`Eyrie average is ${eyrieAverage}, expected ${ESymbolFrequency90.Eyrie} +- 2%.`
);
let corvidAverage = corvidCounter / (numberOfRunTimes * 25);
console.log(
	`Corvid average is ${corvidAverage}, expected ${ESymbolFrequency90.Corvid} +- 2%.`
);
let allianceAverage = allianceCounter / (numberOfRunTimes * 25);
console.log(
	`Alliance average is ${allianceAverage}, expected ${ESymbolFrequency90.Alliance} +- 2%.`
);
let duchyAverage = duchyCounter / (numberOfRunTimes * 25);
console.log(
	`Duchy average is ${duchyAverage}, expected ${ESymbolFrequency90.Duchy} +- 2%.`
);

//Throw errors if we don't get what we expect
if (
	otterAverage <= ESymbolFrequency90.Otter - 0.02 ||
	otterAverage >= ESymbolFrequency90.Otter + 0.02
) {
	console.log(`otter average`, otterAverage);
	throw new Error(
		`Otter is not in a 2% range, it's average is ${otterAverage} insead of the expected ${ESymbolFrequency90.Otter} +- 2%.`
	);
}
if (
	catAverage <= ESymbolFrequency90.Cat - 0.02 ||
	catAverage >= ESymbolFrequency90.Cat + 0.02
)
	throw new Error(
		`Cat is not in a 2% range, it's average is ${catAverage} insead of the expected ${ESymbolFrequency90.Cat} +- 2%.`
	);
if (
	eyrieAverage <= ESymbolFrequency90.Eyrie - 0.02 ||
	eyrieAverage >= ESymbolFrequency90.Eyrie + 0.02
)
	throw new Error(
		`Eyrie is not in a 2% range, it's average is ${eyrieAverage} insead of the expected ${ESymbolFrequency90.Eyrie} +- 2%.`
	);
if (
	corvidAverage <= ESymbolFrequency90.Corvid - 0.02 ||
	corvidAverage >= ESymbolFrequency90.Corvid + 0.02
)
	throw new Error(
		`Corvid is not in a 2% range, it's average is ${corvidAverage} insead of the expected ${ESymbolFrequency90.Corvid} +- 2%.`
	);
if (
	allianceAverage <= ESymbolFrequency90.Alliance - 0.02 ||
	allianceAverage >= ESymbolFrequency90.Alliance + 0.02
)
	throw new Error(
		`Alliance is not in a 2% range, it's average is ${allianceAverage} insead of the expected ${ESymbolFrequency90.Alliance} +- 2%.`
	);
if (
	duchyAverage <= ESymbolFrequency90.Duchy - 0.02 ||
	duchyAverage >= ESymbolFrequency90.Duchy + 0.02
)
	throw new Error(
		`Duchy is not in a 2% range, it's average is ${duchyAverage} insead of the expected ${ESymbolFrequency90.Duchy} +- 2%.`
	);
else
	console.log(
		`Success, all averages are within a 2% range of their expected average!`
	);
