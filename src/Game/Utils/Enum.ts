/**
 * Game states to determine what state we're in; this tells our game what can and cannot be done, ie can't change game during spin
 */
export const EGameStates = {
	SpinningState: "SPINNING",
	StoppingState: "STOPPING",
	LoadingState: "LOADING",
	IdleState: "IDLE",
	RuinsState: "RUINS",
};
/**
 * All eSymbolFrequencies handle the percentage a symbol should appear for their respective win percent, denoted by the number at the end of the name
 */
//*Should equal 1 all together!!
export const ESymbolFrequency75 = {
	Otter: 0.14,
	Cat: 0.15,
	Eyrie: 0.15,
	Corvid: 0.17,
	Alliance: 0.185,
	Duchy: 0.205,
};

export const ESymbolFrequency80 = {
	Otter: 0.13,
	Cat: 0.13,
	Eyrie: 0.14,
	Corvid: 0.19,
	Alliance: 0.19,
	Duchy: 0.22,
};

export const ESymbolFrequency85 = {
	Otter: 0.12,
	Cat: 0.13,
	Eyrie: 0.13,
	Corvid: 0.19,
	Alliance: 0.2,
	Duchy: 0.23,
};

export const ESymbolFrequency90 = {
	Otter: 0.12,
	Cat: 0.14,
	Eyrie: 0.14,
	Corvid: 0.14,
	Alliance: 0.23,
	Duchy: 0.23,
};

export const ESymbolFrequency95 = {
	Otter: 0.1,
	Cat: 0.13,
	Eyrie: 0.15,
	Corvid: 0.15,
	Alliance: 0.23,
	Duchy: 0.24,
};

export const ESymbolValues75 = {
	Otter: 45,
	Cat: 30,
	Eyrie: 25,
	Corvid: 16,
	Alliance: 10,
	Duchy: 10,
};
export const ESymbolValues90 = {
	Otter: 80,
	Cat: 40,
	Eyrie: 30,
	Corvid: 25,
	Alliance: 10,
	Duchy: 10,
};
