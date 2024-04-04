import { ESymbolValues90 } from "../Utils/Enum";

/**
 * Class for symbol constants
 **Nothing in here should be dynamic, this should be a read only file
 */
export class Symbols {
	height: number;
	width: number;
	rowIndex: number;
	colIndex: number;
	canvas: HTMLCanvasElement;
	x: number;
	y: number;
	canMove: boolean;
	image: CanvasImageSource | null;
	symbolName: string | null;
	constructor(canvas: HTMLCanvasElement, colIndex: number, rowIndex: number) {
		this.height = 150;
		this.width = 150;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.canvas = canvas;
		this.x = this.colIndex * (canvas.width / 6) + 225;
		this.y = this.rowIndex * (canvas.height / 3.55) - this.height;
		this.image = null;
		this.canMove = false;
		this.symbolName = null;
	}

	/**
	 * Update for every symbol to create the movement on the canvas while the animate loop is running
	 */
	update(context: CanvasRenderingContext2D, speed = 0) {
		// console.log(`this.y`, this.y, "this.x", this.x);
		if (this.canMove) this.y += speed;

		// Move the symbol downwards based on its speed
		//Zach how do I fix the typing here...
		context.drawImage(
			this.image as any,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

export class Otter extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		//Zach how about the typing here?
		this.image = document.getElementById("otter") as CanvasImageSource;
		this.symbolName = "otter";
		this.value = ESymbolValues90.Otter;
	}
}

export class Eyrie extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("eyrie") as CanvasImageSource;
		this.symbolName = "eyrie";
		this.value = ESymbolValues90.Eyrie;
	}
}
export class Cat extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("cat") as CanvasImageSource;
		this.symbolName = "cat";
		this.value = ESymbolValues90.Cat;
	}
}
export class Corvid extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("corvid") as CanvasImageSource;
		this.symbolName = "corvid";
		this.value = ESymbolValues90.Corvid;
	}
}

export class Alliance extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("alliance") as CanvasImageSource;
		this.symbolName = "alliance";
		this.value = ESymbolValues90.Alliance;
	}
}

export class Duchy extends Symbols {
	symbolName: string;
	value: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("duchy") as CanvasImageSource;
		this.symbolName = "duchy";
		this.value = ESymbolValues90.Duchy;
	}
}
