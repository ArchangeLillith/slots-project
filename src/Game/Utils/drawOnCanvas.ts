/**
 * Displays the state on the canvas when debug is active
 * @param context - The canvas we're drawing on
 * @param state - The state we're in that we want to display
 * @returns the state and a style to apply to that text
 */
export function drawStatusText(
	context: CanvasRenderingContext2D,
	state: string
) {
	context.fillStyle = "white";
	context.fillText("Active state: " + state, 900, 125);
}
