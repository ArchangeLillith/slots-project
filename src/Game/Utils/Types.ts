import { Alliance, Cat, Corvid, Duchy, Eyrie, Otter } from "../Classes/symbols";

/**
 * A map of the final locations for the symbols
 * */
export type FinalLocations = {
	[key: number]: FinalLocation;
};

/**
 * The single array that the above map is made of
 */
export type FinalLocation = {
	[key: number]: { x: number; y: number };
};

export type SymbolClassConstructors = Array<
	| typeof Otter
	| typeof Cat
	| typeof Eyrie
	| typeof Corvid
	| typeof Alliance
	| typeof Duchy
>;

/**
 * Map of the final locations as a placeholder, to be dynamically changed at run time
 */
export const FINAL_LOCATIONS_MAP: FinalLocations = {
	// outer array refers to the column number, inner array refers to objects in the column
	0: {
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 },
		4: { x: 0, y: 0 },
	},
	1: {
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 },
		4: { x: 0, y: 0 },
	},
	2: {
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 },
		4: { x: 0, y: 0 },
	},
	3: {
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 },
		4: { x: 0, y: 0 },
	},
	4: {
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 },
		4: { x: 0, y: 0 },
	},
};
