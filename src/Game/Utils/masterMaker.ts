import { ESymbolFrequency } from "../../Enum";
import { Alliance, Cat, Corvid, Duchy, Eyrie, Otter } from "../Classes/symbols";

export function masterArrayMaker() {
	const MASTER_ARRAY = [];

	//? Attempted to use a double for loop but accessing the enum woulnd't work because I couldn't index with a string
	// for(let i = 1; i < symbolsAvaliable.length; i++){
	//   for(let j = 0; j < 100 * ESymbolFrequency[symbolsAvaliable[i]; j++){
	//   MASTER_ARRAY.push("Otter")}
	// }
	for (let i = 0; i < 100 * ESymbolFrequency.Otter; i++) {
		MASTER_ARRAY.push(Otter);
	}
	for (let i = 0; i < 100 * ESymbolFrequency.Cat; i++) {
		MASTER_ARRAY.push(Cat);
	}
	for (let i = 0; i < 100 * ESymbolFrequency.Eyrie; i++) {
		MASTER_ARRAY.push(Eyrie);
	}
	for (let i = 0; i < 100 * ESymbolFrequency.Corvid; i++) {
		MASTER_ARRAY.push(Corvid);
	}
	for (let i = 0; i < 100 * ESymbolFrequency.Alliance; i++) {
		MASTER_ARRAY.push(Alliance);
	}
	for (let i = 0; i < 100 * ESymbolFrequency.Duchy; i++) {
		MASTER_ARRAY.push(Duchy);
	}
	return MASTER_ARRAY;
}
