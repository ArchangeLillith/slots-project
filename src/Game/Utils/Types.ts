export type FinalLocations = {
	[key: number]: FinalLocation;
};

export type FinalLocation = {
	[key: number]: { x: number; y: number };
};

export const FINAL_LOCATIONS_MAP: FinalLocations = {
	//x is the outer, y is the inner for the location of the symbol on the grid
	//! Changed to show massive difference to ensure working, real number for o Y is 165 NOT 600
	0: {
		0: { x: 225, y: 165 },
		1: { x: 545, y: 165 },
		2: { x: 865, y: 165 },
		3: { x: 1185, y: 165 },
		4: { x: 1505, y: 165 },
	},
	1: {
		0: { x: 225, y: 481 },
		1: { x: 545, y: 481 },
		2: { x: 865, y: 481 },
		3: { x: 1185, y: 481 },
		4: { x: 1505, y: 481 },
	},
	2: {
		0: { x: 225, y: 815 },
		1: { x: 545, y: 815 },
		2: { x: 865, y: 815 },
		3: { x: 1185, y: 815 },
		4: { x: 1505, y: 815 },
	},
	3: {
		0: { x: 225, y: 1185 },
		1: { x: 545, y: 1185 },
		2: { x: 865, y: 1185 },
		3: { x: 1185, y: 1185 },
		4: { x: 1505, y: 1185 },
	},
	4: {
		0: { x: 225, y: 1113 },
		1: { x: 545, y: 1113 },
		2: { x: 865, y: 1113 },
		3: { x: 1185, y: 1113 },
		4: { x: 1505, y: 1113 },
	},
};
