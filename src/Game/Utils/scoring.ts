export default function scoringAlgorithm(scoringArray: any) {
	//REFACTOR check for ruins here
	let winnings: number = 0;

	for (let array of scoringArray) {
		if (array[0].symbolName === array[1].symbolName) {
			if (array[1].symbolName === array[2].symbolName) {
				if (array[2].symbolName === array[3].symbolName) {
					if (array[3].symbolName === array[4].symbolName) {
						winnings += array[0].value * 5;

						changeImage(array, 4);
					} else {
						winnings += array[0].value * 4;

						changeImage(array, 3);
					}
				} else {
					winnings += array[0].value * 3;

					changeImage(array, 2);
				}
			}
		}
	}
	return winnings;
}

function changeImage(array: any, j: number) {
	const allianceWinner = document.getElementById("alliance-winner");
	const otterWinner = document.getElementById("otter-winner");
	const catWinner = document.getElementById("cat-winner");
	const duchyWinner = document.getElementById("duchy-winner");
	const eyrieWinner = document.getElementById("eyrie-winner");
	const corvidWinner = document.getElementById("corvid-winner");
	for (let i = 0; i <= j; i++) {
		switch (array[i].symbolName) {
			case "alliance":
				array[i].image = allianceWinner;
				break;
			case "otter":
				array[i].image = otterWinner;
				break;
			case "cat":
				array[i].image = catWinner;
				break;
			case "corvid":
				array[i].image = corvidWinner;
				break;
			case "duchy":
				array[i].image = duchyWinner;
				break;
			case "eyrie":
				array[i].image = eyrieWinner;
				break;
		}
	}
}
