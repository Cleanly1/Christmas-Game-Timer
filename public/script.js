const minMinutes = 10;
const maxMinutes = 15;
let timeLeft = 0;
let timer;
let interval;
const audio = new Audio("./assets/alarm.wav");
audio.loop = true;
let started = false;

const showButton = document.querySelector("#showButton");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const maxInput = document.querySelector("#maxMinutes");
maxInput.addEventListener("change", (event) => {
	maxInput.setAttribute("value", event.target.value);
	const minValue = minInput.getAttribute("value");
	if (parseFloat(event.target.value) < parseFloat(minValue)) {
		minInput.setAttribute("value", event.target.value);
		minInput.value = event.target.value;
	}
});
const minInput = document.querySelector("#minMinutes");
minInput.addEventListener("change", (event) => {
	minInput.setAttribute("value", event.target.value);
	const maxValue = maxInput.getAttribute("value");
	if (parseFloat(event.target.value) > parseFloat(maxValue)) {
		maxInput.setAttribute("value", event.target.value);
		maxInput.value = event.target.value;
	}
});
const svg = document.querySelector(".timer_icon");

maxInput.setAttribute("value", maxMinutes);
minInput.setAttribute("value", minMinutes);

const timeDisplay = document.querySelector("#time");

const getMillisecondsForMinutes = (minutes) => {
	return 1000 * 60 * minutes;
};

const stopTime = () => {
	clearInterval(interval);
	clearTimeout(timer);
	svg.classList.remove("timer_icon--active");
	audio.pause();

	timeDisplay.innerHTML = "--:--";
	startButton.innerHTML = "Start";
	timeLeft = 0;
	started = false;
};

const startTimer = (pauseTimeLeft) => {
	if (started) {
		return;
	}
	stopTime();
	const maxValue = maxInput.getAttribute("value");
	const minValue = minInput.getAttribute("value");

	const timeOut =
		pauseTimeLeft != 0
			? pauseTimeLeft
			: Math.floor(
					Math.random() *
						(getMillisecondsForMinutes(maxValue) -
							getMillisecondsForMinutes(minValue)) +
						getMillisecondsForMinutes(minValue)
			  );

	timeLeft = timeOut;

	interval = setInterval(() => {
		timeLeft = timeLeft - 1000;
		svg.classList.toggle("timer_icon--active");
	}, 1000);

	timer = setTimeout(() => {
		audio.play();
		timeDisplay.innerHTML = "Klart!";
	}, timeOut);
	started = true;
};

const getTimeLeft = () => {
	const minutesLeft = Math.floor(timeLeft / 1000 / 60);
	const secondsLeft = Math.floor(
		Math.floor(timeLeft / 1000) - minutesLeft * 60
	);
	return `${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${
		secondsLeft == 0 ? "00" : secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
	}`;
};

showButton.addEventListener("click", () => {
	timeDisplay.innerHTML = getTimeLeft();

	const showInterval = setInterval(() => {
		timeDisplay.innerHTML = getTimeLeft();
	}, 1000);

	setTimeout(() => {
		clearInterval(showInterval);
		timeDisplay.innerHTML = !started && timeLeft != 0 ? "Paused" : "--:--";
	}, 3000);
});

const pauseTimer = () => {
	clearInterval(interval);
	clearTimeout(timer);
	svg.classList.remove("timer_icon--active");
	audio.pause();

	timeDisplay.innerHTML = "Paused";
	started = false;
};

const onStartPauseClick = () => {
	if (started) {
		pauseTimer();
		startButton.innerHTML = "Start";
	} else {
		startTimer(timeLeft ?? undefined);
		startButton.innerHTML = "Pause";
	}
};

startButton.addEventListener("click", onStartPauseClick);

stopButton.addEventListener("click", stopTime);
