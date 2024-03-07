export class Symbols {
	constructor(canvas, rowIndex, colIndex) {
		this.canvas = canvas;
		this.height = 256;
		this.width = 256;
		// console.log("Symbol class constructor hit");
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.x = rowIndex;
		this.y = colIndex - canvas.height;
		this.speed = 50;
	}
	//This is going to pause when any state except for spinning is enabled as there's no need for it in any other state (I think...)
	update(context) {
		return;
	}
	draw(context) {
		console.log("draw on symbols class called");
		this.y += this.speed;
		context.drawImage(
			this.image,
			(this.x + this.width) * this.colIndex,
			(this.y + this.height) * this.rowIndex,
			this.width,
			this.height
		);
	}
}

export class Otter extends Symbols {
	constructor(canvas, rowIndex, colIndex) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("otter");
		this.symbolName = "otter";
		this.symbolFrequency = 0.5;
	}
}

export class Cat extends Symbols {
	constructor(canvas, rowIndex, colIndex) {
		super(canvas, rowIndex, colIndex);
		this.image = document.getElementById("cat");
		console.log(this.image);
		this.symbolName = "cat";
		this.symbolFrequency = 0.5;
	}
}

export class Corvid extends Symbols {
	constructor(rowIndex, colIndex) {
		super(rowIndex, colIndex);
		this.image = document.getElementById("corvid");
		this.symbolName = "corvid";
	}
}

export class Eyrie extends Symbols {
	constructor(rowIndex, colIndex) {
		super(rowIndex, colIndex);
		this.image = document.getElementById("eyrie");
		this.symbolName = "eyrie";
	}
}

export class Alliance extends Symbols {
	constructor(rowIndex, colIndex) {
		super(rowIndex, colIndex);
		this.image = document.getElementById("alliance");
		this.symbolName = "alliance";
	}
}

export class Duchy extends Symbols {
	constructor(rowIndex, colIndex) {
		super(rowIndex, colIndex);
		this.image = document.getElementById("duchy");
		this.symbolName = "duchy";
	}
}
