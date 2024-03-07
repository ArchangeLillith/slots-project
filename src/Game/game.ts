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
import { UserContext } from "../context.jsx";

//Global definitions
let SYMBOLS: any = [];
let MASTER_SYMBOL_LIST = [Otter, Cat];
const MAX_SYMBOLS: number = 10;

export class Game {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	context: any;
	UI: any;
	input: any;
	debug: boolean;
	score: number;
	gameOver: boolean;
	currentState: string;
	constructor(
		canvas: HTMLCanvasElement,
		width: number,
		height: number,
		context: any
	) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.context = context;
		this.UI = new UI(this);
		this.input = new InputHandler(this);
		this.debug = true;
		this.score = 0;
		this.gameOver = false;
		this.currentState = "IDLE";
	}

	//todo Update function should be what is described below, not handle the spinning function as it is
	update(deltaTime: number) {
		//If the current state is NOT an instance of SpinningState this returns.
		//TODO this bypasses the typing, fix it eventually
		if (!((this.currentState as any) instanceof SpinningState)) {
			return;
		}

		// If there are too many symbols on the canvas, dont add more
		if (SYMBOLS.length >= MAX_SYMBOLS) {
			return;
		}

		//Add pieces if needed
		this.addPiecesIfNeeded();

		//Update current symbols
		for (const symbol of SYMBOLS) {
			symbol.update(this.context, deltaTime);
		}

		//Handler for symbols that go off canvas
		for (let i = 0; i < SYMBOLS.length; i++) {
			if (SYMBOLS[i].y > 620) {
				SYMBOLS.splice(i, 1);
			}
		}

		// Draw the updated state
		this.draw(this.context);
	}

	//todo make this next part happen lol
	/**Spin handles the generation of the pieces as the state demands. This should ONLY fire while in SpinningState, and calls to addPieces to handle the actual generation.
	 *
	 */
	spin() {
		const { globalContext, setGlobalContext } = useContext(GlobalContext);
		// Set current state to SpinningState
		setGlobalContext({ state: "SPINNING" });
		console.log("Spinning state entered");
		// Generate 5 pieces
	}

	stop() {
		// Set current state to IdleState
		this.currentState = "IDLE";
	}

	// Determine if new pieces need to be added based on game logic
	// Add pieces if necessary
	addPiecesIfNeeded() {
		this.addPieces(this.canvas, 1, 5);
	}

	// Handler for symbols that go off canvas
	removeOffscreenSymbols() {
		for (let i = 0; i < SYMBOLS.length; i++) {
			if (SYMBOLS[i].y > this.canvas.height) {
				SYMBOLS.splice(i, 1);
			}
		}
	}

	/**Called internally by update, calls to the Symbols class and calls their draw function. This is a seperate function because not all game states require a draw method, ie idleState
	 *
	 * @param deltaTime - used in symbol classes for timing purposes
	 * @param context - important to the function to know what it's drawing on
	 */
	draw(context: any) {
		for (const symbol of SYMBOLS) {
			symbol.draw(context);
		}
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
	addPieces(canvas: HTMLCanvasElement, rows: number, cols: number) {
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
