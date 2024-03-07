export const states = {
	LOAD: 0,
	//when the wheel spins, lock all but one mouse input
	SPINNING: 1,
	//at then end of each spin, locks all input and can transition into other states
	PAYOUT: 2,
	//blinking spin button, ability to change game ect
	IDLE: 3,
	//rolled 3 ruins, picking game commences
	RUINS_GAME: 4,
	//state for ruins payout, similar to payout class but used for ruin items
	RUINS_PAYOUT: 5,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

//todo: do we need load state? Maybe for inbetween games eventually, or between main slots and ruins
export class LoadState extends State {
	constructor(game) {
		super("LoadState");
		this.game = game;
	}
	enter() {}
	handleInput(input) {
		return;
	}
}

export class SpinningState extends State {
	constructor(game) {
		super("SpinningState");
		this.game = game;
	}
	enter() {
		//this will eventually grey out unclickable buttons
	}
	handleInput(input) {
		if (input === "mousedown") stopSpinning();
		else return;
	}
}

export class PayoutState extends State {
	constructor(game) {
		super("PayoutState");
		this.game = game;
	}
	enter() {}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS down") this.player.setState(states.SITTING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
	}
}

export class IdleState extends State {
	constructor(game) {
		super("IdleState");
		this.game = game;
	}
	enter() {}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS down") this.player.setState(states.SITTING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
	}
}

export class RuinsGameState extends State {
	constructor(game) {
		super("RuinsGameState");
		this.game = game;
	}
	enter() {}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS down") this.player.setState(states.SITTING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
	}
}

export class RuinsPayoutState extends State {
	constructor(game) {
		super("RuinsPayoutState");
		this.game = game;
	}
	enter() {}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS down") this.player.setState(states.SITTING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
	}
}

/**
 *
 */
function stopSpinning() {
	console.log("input detected, the spinning should have stopped");
}
