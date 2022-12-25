const minMinutes = 10;
const maxMinutes = 15;
let timeLeft = 0;
let timer;
let interval;
const audio = new Audio("./assets/alarm.wav");
let started = false;

const showButton = document.querySelector("#showButton");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const maxInput = document.querySelector("#maxMinutes");
maxInput.addEventListener("change", (event) => {
	maxInput.setAttribute("value", event.target.value);
});
const minInput = document.querySelector("#minMinutes");
minInput.addEventListener("change", (event) => {
	minInput.setAttribute("value", event.target.value);
});
const svg = document.querySelector(".timerIcon");

maxInput.setAttribute("value", maxMinutes);
minInput.setAttribute("value", minMinutes);

const timeDisplay = document.querySelector("#time");

const getMillisecondsForMinutes = (minutes) => {
	return 1000 * 60 * minutes;
};

const stopTime = () => {
	clearInterval(interval);
	clearTimeout(timer);
	audio.pause();

	timeLeft = 0;
};

const startTimer = () => {
	if (started) {
		return;
	}
	stopTime();
	const maxValue = maxInput.getAttribute("value");
	const minValue = minInput.getAttribute("value");

	const timeOut = Math.floor(
		Math.random() *
			(getMillisecondsForMinutes(maxValue) -
				getMillisecondsForMinutes(minValue)) +
			getMillisecondsForMinutes(minValue)
	);

	timeDisplay.innerHTML = "--:--";

	timeLeft = timeOut;

	interval = setInterval(() => {
		timeLeft = timeLeft - 1000;
		svg.classList.toggle("timerIcon-active");
	}, 1000);

	timer = setTimeout(() => {
		audio.play();
	}, timeOut);
};

const getTimeLeft = () => {
	const minutesLeft = Math.floor(timeLeft / 1000 / 60);
	const secondsLeft = Math.floor(
		Math.floor(timeLeft / 1000) - minutesLeft * 60
	);
	return `${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${
		secondsLeft == 0
			? "00"
			: secondsLeft < 10
			? `0${secondsLeft}`
			: secondsLeft
	}`;
};

showButton.addEventListener("click", () => {
	timeDisplay.innerHTML = getTimeLeft();

	const showInterval = setInterval(() => {
		timeDisplay.innerHTML = getTimeLeft();
	}, 1000);

	setTimeout(() => {
		clearInterval(showInterval);
		timeDisplay.innerHTML = "--:--";
	}, 3000);
});

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", stopTime);
