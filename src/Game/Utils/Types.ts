export type FinalLocations = {
	[key: number]: FinalLocation;
};

export type FinalLocation = {
	[key: number]: { x: number; y: number };
};

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
