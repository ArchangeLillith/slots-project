import { ESymbolFrequency90 } from "./Enum";
import { Alliance, Cat, Corvid, Duchy, Eyrie, Otter } from "../Classes/symbols";
import { SymbolClassConstructors } from "./Types";

/**
 * Create the master array (length 100) based on the symbol frequency
 * @returns An array of class functions, length 100
 * ? Future consideration: We need to ensure that this can handle when we want to change the symbol frequency as it's hard coded here. Maybe pass in the frequency number and interpolate it
 */
export function masterArrayMaker(): SymbolClassConstructors {
	const MASTER_ARRAY = [];
	for (let i = 0; i < 99 * ESymbolFrequency90.Otter; i++) {
		MASTER_ARRAY.push(Otter);
	}
	for (let i = 0; i < 99 * ESymbolFrequency90.Cat; i++) {
		MASTER_ARRAY.push(Cat);
	}
	for (let i = 0; i < 99 * ESymbolFrequency90.Eyrie; i++) {
		MASTER_ARRAY.push(Eyrie);
	}
	for (let i = 0; i < 99 * ESymbolFrequency90.Corvid; i++) {
		MASTER_ARRAY.push(Corvid);
	}
	for (let i = 0; i < 99 * ESymbolFrequency90.Alliance; i++) {
		MASTER_ARRAY.push(Alliance);
	}
	for (let i = 0; i < 99 * ESymbolFrequency90.Duchy; i++) {
		MASTER_ARRAY.push(Duchy);
	}
	return MASTER_ARRAY;
}
