export const EGameStates = {
	SpinningState: "SPINNING",
	StoppingState: "STOPPING",
	LoadingState: "LOADING",
	IdleState: "IDLE",
	RuinsState: "RUINS",
};

//*Should equal 1 all together!!
export const ESymbolFrequency = {
	Otter: 0.5,
	Cat: 0.1,
	Eyrie: 0.1,
	Corvid: 0.1,
	Alliance: 0.1,
	Duchy: 0.1,
};

export const FinalLocations = {
	//x is the outer, y is the inner for the location of the symbol on the grid
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
		0: { x: 225, y: 865 },
		1: { x: 545, y: 865 },
		2: { x: 865, y: 865 },
		3: { x: 1185, y: 865 },
		4: { x: 1505, y: 865 },
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
