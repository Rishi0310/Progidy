let timer;
let isRunning = false;
let startTime;
let lapStartTime;
let laps = [];

function startStop() {
    const startStopBtn = document.getElementById("startStop");
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - (lapStartTime || 0);
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Stop";
        isRunning = true;
    }
}

function lapReset() {
    const lapResetBtn = document.getElementById("lapReset");
    if (isRunning) {
        const lapTime = Date.now() - lapStartTime;
        laps.push(formatTime(lapTime));
        updateLaps();
        lapStartTime = Date.now();
    } else {
        clearInterval(timer);
        document.getElementById("display").textContent = "00:00:00";
        laps = [];
        updateLaps();
        lapStartTime = null;
        lapResetBtn.textContent = "Lap";
    }
}

function Reset() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    updateLaps();
    isRunning = false;
    lapStartTime = null;
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("lapReset").textContent = "Lap";
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const centiseconds = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
