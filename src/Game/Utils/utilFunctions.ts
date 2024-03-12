export function drawStatusText(
	context: CanvasRenderingContext2D,
	state: string
) {
	context.font = "30px Helvetica";
	context.fillStyle = "white";
	context.fillText("Active state: " + state, 20, 30);
}
