import { ESymbolFrequency } from "../../Enum";

export class Symbols {
	height: number;
	width: number;
	rowIndex: number;
	colIndex: number;
	canvas: HTMLCanvasElement;
	x: number;
	y: number;
	image: CanvasImageSource | null;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		this.height = 200;
		this.width = 200;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.canvas = canvas;
		this.x = this.rowIndex * (canvas.width / 5) + 100;
		this.y = this.colIndex * (canvas.height / 3) - this.height - 100;
		this.image = null;
	}
	//This is going to pause when any state except for spinning is enabled as there's no need for it in any other state (I think...)
	update(context: CanvasRenderingContext2D, speed = 0) {
		// Move the symbol downwards based on its speed
		this.y += speed;
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
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		//Zach how about the typing here?
		this.image = document.getElementById("otter") as CanvasImageSource;
		this.symbolName = "otter";
		this.symbolFrequency = ESymbolFrequency.Otter;
	}
}

export class Eyrie extends Symbols {
	symbolName: string;
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("eyrie") as CanvasImageSource;
		this.symbolName = "eyrie";
		this.symbolFrequency = ESymbolFrequency.Eyrie;
	}
}
export class Cat extends Symbols {
	symbolName: string;
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("cat") as CanvasImageSource;
		this.symbolName = "cat";
		this.symbolFrequency = ESymbolFrequency.Cat;
	}
}
export class Corvid extends Symbols {
	symbolName: string;
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("corvid") as CanvasImageSource;
		this.symbolName = "corvid";
		this.symbolFrequency = ESymbolFrequency.Corvid;
	}
}
export class Alliance extends Symbols {
	symbolName: string;
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("alliance") as CanvasImageSource;
		this.symbolName = "alliance";
		this.symbolFrequency = ESymbolFrequency.Alliance;
	}
}
export class Duchy extends Symbols {
	symbolName: string;
	symbolFrequency: number;
	constructor(canvas: HTMLCanvasElement, rowIndex: number, colIndex: number) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("duchy") as CanvasImageSource;
		this.symbolName = "duchy";
		this.symbolFrequency = ESymbolFrequency.Duchy;
	}
}
