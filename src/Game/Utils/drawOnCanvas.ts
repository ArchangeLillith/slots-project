export function drawStatusText(
	context: CanvasRenderingContext2D,
	state: string
) {
	context.fillStyle = "white";
	context.fillText("Active state: " + state, 900, 125);
}
