import { ESymbolFrequency } from "../Utils/Enum";

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
	}
	//This is going to pause when any state except for spinning is enabled as there's no need for it in any other state (I think...)
	update(context: CanvasRenderingContext2D, speed = 0) {
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

//Where pieces should land XY coords
// (225, 165) (545, 165) (865, 165) (1185, 165) (1505, 165)
// (225, 481) (545, 481) (865, 481) (1185, 481) (1505, 481)
// (225, 797) (545, 797) (865, 797) (1185, 797) (1505, 797)
// (225, 1113) (545, 1113) (865, 1113) (1185, 1113) (1505, 1113)
