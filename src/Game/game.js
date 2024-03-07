import {
	Otter,
	Cat,
	Corvid,
	Eyrie,
	Alliance,
	Duchy,
} from "./Classes/symbols.js";
import { UI } from "../UI/UI.js";
import {
	LoadState,
	SpinningState,
	PayoutState,
	IdleState,
	RuinsGameState,
	RuinsPayoutState,
} from "./Utils/states.js";
import InputHandler from "./input.js";
let SYMBOLS = [];
let MASTER_SYMBOL_LIST = [Otter, Cat];

export class Game {
	constructor(canvas, width, height, context) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.context = context;
		this.UI = new UI(this);
		this.input = new InputHandler(this);
		this.debug = true;
		this.score = 0;
		this.gameOver = false;
		this.states = [
			new LoadState(this),
			new SpinningState(this),
			new PayoutState(this),
			new IdleState(this),
			new RuinsGameState(this),
			new RuinsPayoutState(this),
		];
		this.currentState = this.states[3];
	}

	//todo Update function should be what is described below, not handle the spinning function as it is
	/** Update handles the high level function of the game. It checks against game state first and will then decide based on that information which secondary function to call.
	 *
	 * @param deltaTime - used in timing logic, currently not implimented
	 */
	update(deltaTime) {
		//If the current state is NOT an instance of SpinningState this returns.
		if (!(this.currentState instanceof SpinningState)) {
			//Initial call to start initializing pieces
			return;
		}
		//calling Game class draw method
		this.addPieces(this.canvas, 1, 5);
		for (const symbol of SYMBOLS) {
			symbol.update(this.context);
		}

		//Handler for symbols that go off canvas
		for (let i = 0; i < SYMBOLS.length; i++) {
			if (SYMBOLS[i].y > 620) {
				SYMBOLS.splice(i, 1);
			}
		}
		//Refreshing the state for testing purposes

		this.draw(this.context);
	}

	//todo make this next part happen lol
	/**Spin handles the generation of the pieces as the state demands. This should ONLY fire while in SpinningState, and calls to addPieces to handle the actual generation.
	 *
	 */
	spin() {
		//Disabling button for any state not IdleState
		// if(!(this.currentState instanceof IdleState)){
		//     return;
		// }

		this.currentState = this.states[1];
		console.log("spinning state entered");
		//Generate 5 pieces
	}

	//todo not sure what this next will do, figure it out. Prob handle stopping the spinning when input happens
	/**
	 *
	 */
	stop() {
		// if(!(this.currentState instanceof SpinningState)){
		//     return;
		// }
		this.currentState = this.states[3];
	}

	/**Called internally by update, calls to the Symbols class and calls their draw function. This is a seperate function because not all game states require a draw method, ie idleState
	 *
	 * @param deltaTime - used in symbol classes for timing purposes
	 * @param context - important to the function to know what it's drawing on
	 */
	draw(context) {
		for (const nameOfSymbol of SYMBOLS) {
			nameOfSymbol.draw(context);
		}

		//todo impliment UI
		// this.UI.draw(context);
	}

	/**The generation function for the pieces. First it assigns a count variable for the rows (i), then iterating over each symbol with this variable and adding to the count to log where it is. Then it assigns the variable (j) to columns and doing the same thing, which will output a set of coordinates (i,j) to the function to tell the computer where symbols are in a grid layout.
	 *
	 * This is modular, and why we can change it from a 5x1 to whatever we want, because the variables will stop when they're over the size of the number of rows/columns. We use over, not equal to, because if we did we'd be missing a final piece.
	 *
	 * Finally, a random number is generated to pick a symbol in the MASTER_SYMBOL_LIST that contains 100 symbols, their number added being dependant on the specific symbol's class parameter "symbolFrequency". This reflects a less processing intensive way of generating a quasi random symbol, using a static arrray and pulling from that as the percentages in it are already predetermined. The symbol is picked via random number and added to the SYMBOLS array, the array that's displayed on the screen for the user to see.
	 *
	 * @param canvas - Referring to the base canvas, used when a symbol is pushed to the SYMBOLS array so that symbol knows where it's supposed to be seen
	 * @param rows - The number of rows the function should generate.
	 * @param cols - The number of columns the function should generate.
	 */
	addPieces(canvas, rows, cols) {
		// console.log("piece initializer engaged");
		//Rows assigned here
		for (let i = 0; i < rows; i++) {
			//Columns assigned here
			for (let j = 0; j < cols; j++) {
				//Pushing to the array now, filling the predefined array.
				let math = Math.round(Math.random());
				SYMBOLS.push(new MASTER_SYMBOL_LIST[math](canvas, i, j));
				// console.log(SYMBOLS);
			}
		}
		// console.log("piece draw finished");
	}
}
