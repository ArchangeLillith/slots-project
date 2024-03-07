//This will hold all UI related functions and pull/recieve data from other files to display

export class UI {
	constructor(game) {
		this.image = document.getElementById("background");
		this.game = game;
	}
	draw(context) {
		context.drawImage(this.image, 0, 0, window.innerWidth, window.innerHeight);
	}
}
