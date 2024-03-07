export default class InputHandler {
	constructor(game) {
		this.game = game;
		this.keys = [];
		window.addEventListener("mousedown", (e) => {
			this.keys.push(e.type);
			console.log(e.type);
		});
		window.addEventListener("mouseup", (e) => {
			this.keys.splice(this.keys.indexOf(e.type), 1);
			console.log(e.type);
		});
	}
}
