const minMinutes = 15;
const maxMinutes = 25;

const getMinutes = (minutes) => {
	return 1000 * 60 * minutes;
};

const startTimer = () => {
	const timeOut = Math.floor(
		Math.random() * (getMinutes(maxMinutes) - getMinutes(minMinutes)) +
			getMinutes(minMinutes)
	);
	console.log(Math.floor(timeOut / 1000 / 60), timeOut);

	const timer = setTimeout(() => {}, 1000);
};

const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", startTimer);
