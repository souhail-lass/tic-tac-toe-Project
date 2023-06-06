// Importing elements

const O = document.querySelector("#O");
const X = document.querySelector("#X");
const svg2 = document.querySelector("#svg2");
const svg1 = document.querySelector("#path1");
const playBtn = document.querySelector(".start-game");
const restartBtn = document.querySelector(".restart-btn");
const homeBtn = document.querySelector(".home-btn");
const gameInitializer = document.querySelector(".game-initializer");
const gameLoad = document.querySelector(".game-started");
const boxes = Array.from(document.querySelectorAll(".box"));
const signText = document.querySelector(".get-sign");
const overlay = document.querySelector(".overlay");
const quitButton = document.querySelector(".quitButton");
const nextRoundButton = document.querySelector(".nextRoundButton");
const adios = document.querySelector(".adios");
const next = document.querySelector(".next");
const winnerMark = document.querySelector(".winnerMark");
const xPlayer = document.querySelector(".xPlayer");
const oPlayer = document.querySelector(".oPlayer");
const tie = document.querySelector(".Tie");
const winnerPopup = document.querySelector(".winnerPopup");
const tiePopup = document.querySelector(".tiePopup");

// Creating the spaces array to check whether the box is empty

let spaces = Array(9).fill(false);

let currentPlayer = "";

// Actual game function

const gamePlay = () => {
	// Hovering effect function

	const hoverBox = () => {
		boxes.forEach((box) => {
			if (currentPlayer == "X") {
				if (box.classList.contains("oHover")) {
					box.classList.remove("oHover");
				}
				box.classList.add("xHover");
			} else {
				if (box.classList.contains("xHover")) {
					box.classList.remove("xHover");
				}
				box.classList.add("oHover");
			}
		});
	};

	// Box checking function

	const boxClicked = (e) => {
		const id = e.target.id;
		if (!spaces[id]) {
			spaces[id] = currentPlayer;
			let mark = document.createElement("img");
			if (currentPlayer == "X") {
				e.target.append(mark); //DRAW X
				mark.className = "xImg"; //STYLE
				e.target.classList.add("X"); //STYLE
				signText.innerHTML = "<img src='./assets/Onrml.svg'>";
			} else {
				e.target.append(mark); //DRAW O
				mark.className = "oImg"; //STYLE
				e.target.classList.add("circle"); //STYLE
				signText.innerHTML = "<img src='./assets/Xnrml.svg'>";
			}

			const result = checkWinner(currentPlayer);
			const winner = result.winner;
			const isTie = result.isTie;

			if (winner) {
				setTimeout(() => {
					overlay.style.display = "flex";
					winnerPopup.style.display = "flex";
					tiePopup.style.display = "none";
					if (winner === "X") {
						winnerMark.src = "./assets/Xgreen.svg";
						let scoreX = parseInt(xPlayer.innerText);
						scoreX += 1;
						xPlayer.innerText = scoreX;
					} else if (winner === "O") {
						winnerMark.src = "./assets/Oyellow.svg";
						let scoreO = parseInt(oPlayer.innerText);
						scoreO += 1;
						oPlayer.innerText = scoreO;
					}
				}, 600);
			} else if (isTie) {
				setTimeout(() => {
					overlay.style.display = "flex";
					winnerPopup.style.display = "none";
					tiePopup.style.display = "flex";
					let scoreTie = parseInt(tie.innerText);
					scoreTie += 1;
					tie.innerText = scoreTie;
				}, 600);
			} else {
				currentPlayer = currentPlayer === "X" ? "O" : "X";
				hoverBox(); // Changing the hover for all boxes for each click
			}
		}
	};
	boxes.forEach((box) => box.addEventListener("click", boxClicked));
	hoverBox(); // Used to get the first hover for the boxes
};
const quitGame = () => {
	overlay.style.display = "none";
	gameLoad.style.display = "none";
	gameInitializer.style.display = "flex";
	gameRestart();
};
const NextRound = () => {
	overlay.style.display = "none";
	clearSpaces();
};
quitButton.addEventListener("click", quitGame);
nextRoundButton.addEventListener("click", NextRound);
adios.addEventListener("click", quitGame);
next.addEventListener("click", NextRound);

// Winning Combinations :

const winningPossibilities = [
	[0, 1, 2], // Top row
	[3, 4, 5], // Middle row
	[6, 7, 8], // Bottom row
	[0, 3, 6], // Left column
	[1, 4, 7], // Middle column
	[2, 5, 8], // Right column
	[0, 4, 8], // Diagonal from top-left to bottom-right
	[2, 4, 6], // Diagonal from top-right to bottom-left
];
// Check the Winner :

const checkWinner = (player) => {
	let winner = null;
	let isTie = true;

	for (let Possibility of winningPossibilities) {
		const [a, b, c] = Possibility;
		if (spaces[a] === player && spaces[b] === player && spaces[c] === player) {
			let targetedBoxes = Possibility.map((i) => boxes[i]);
			targetedBoxes.forEach((box) => {
				if (player === "X") {
					box.classList.add("winnerX");
					winner = "X";
				} else {
					box.classList.add("winnerO");
					winner = "O";
				}
			});
			return { winner, isTie: false }; // Return the winner and isTie as an object
		}
	}

	for (let space of spaces) {
		if (!space) {
			isTie = false;
			break;
		}
	}

	if (winner) {
		return { winner, isTie: false }; // Return winner and isTie as an object
	} else if (isTie) {
		return { winner: null, isTie: true }; // Return null for winner and true for isTie as an object
	}

	return { winner: null, isTie: false }; // Return null for both winner and isTie as an object
};

// Swapping background effect

const swap1 = () => {
	let bgColorX = window
		.getComputedStyle(X)
		.getPropertyValue("background-color");
	if (bgColorX === "rgb(26, 43, 51)") {
		X.classList.add("bgWhite");
		O.classList.add("bgDark");
		svg1.classList.add("xDark");
		svg2.classList.add("oWhite");
	}
};

const swap2 = () => {
	let bgColorO = window
		.getComputedStyle(O)
		.getPropertyValue("background-color");
	if (bgColorO === "rgb(26, 43, 51)") {
		O.classList.remove("bgDark");
		X.classList.remove("bgWhite");
		svg2.classList.remove("oWhite");
		svg1.classList.remove("xDark");
	}
};

X.addEventListener("click", swap1);
O.addEventListener("click", swap2);

// Getting current player & starting the game

const startGame = async () => {
	currentPlayer = await document.querySelector(".mark-choice > .bgWhite").id;
	signText.innerHTML = await `<img src='./assets/${currentPlayer}nrml.svg'>`;
	playBtn.classList.add("PlayBtn-Effect");
	setTimeout(() => {
		playBtn.classList.remove("PlayBtn-Effect");
		gameInitializer.style.display = "none";
		gameLoad.style.display = "flex";
	}, 300);
	gamePlay();
};

playBtn.addEventListener("click", startGame);

// Restarting game

const clearSpaces = () => {
	spaces = Array(9).fill(false);
	boxes.forEach((box) => {
		box.innerHTML = "";
		box.className = "Box";
		currentPlayer == "X"
			? box.classList.add("xHover")
			: box.classList.add("oHover");
	});

	signText.innerHTML = `<img src='./assets/${currentPlayer}nrml.svg'>`;
};
const gameRestart = () => {
	spaces = Array(9).fill(false);
	xPlayer.innerText = 0;
	oPlayer.innerText = 0;
	tie.innerText = 0;
	boxes.forEach((box) => {
		box.innerHTML = "";
		box.className = "Box";
		currentPlayer == "X"
			? box.classList.add("xHover")
			: box.classList.add("oHover");
	});

	signText.innerHTML = `<img src='./assets/${currentPlayer}nrml.svg'>`;
};

restartBtn.addEventListener("click", () => {
	setTimeout(() => {
		restartBtn.classList.add("restartEffect");
		gameRestart();
		setTimeout(() => {
			restartBtn.classList.remove("restartEffect");
		}, 300);
	}, 100);
});

homeBtn.addEventListener("click", () => {
	setTimeout(() => {
		homeBtn.classList.add("homeEffect");
		setTimeout(() => {
			homeBtn.classList.remove("homeEffect");
			quitGame();
		}, 300);
	}, 100);
});
