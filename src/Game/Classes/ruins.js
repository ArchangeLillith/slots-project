// Ruins class and state management will go here

export class Ruins {
	constructor() {}
	/**The initial call that checks for ruins and determines what to do from there.
	 *
	 * @param game - The game object that is currently being manipulated
	 */
	checkForRuins(game) {
		if (this.hasRuins) {
			console.log("there are ruins");
		}
	}
}
