const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const displayMilliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const statusText = document.getElementById("status");
const laps = document.getElementById("laps");
const timerCard = document.querySelector(".timer-card");

let ms = 0;
let sec = 0;
let min = 0;
let timer = null;

function updateDisplay() {
    displayMinutes.textContent =
        min < 10 ? "0" + min : min;

    displaySeconds.textContent =
        sec < 10 ? "0" + sec : sec;

    displayMilliseconds.textContent =
        "." + (ms < 10 ? "0" + ms : ms);
}

function startTimer() {

    if(timer !== null) return;

    statusText.textContent = "RUNNING";
    timerCard.classList.add("running");

    timer = setInterval(() => {

        ms++;

        if(ms === 100){
            ms = 0;
            sec++;
        }

        if(sec === 60){
            sec = 0;
            min++;
        }

        updateDisplay();

    },10);
}

function pauseTimer(){

    clearInterval(timer);
    timer = null;

    statusText.textContent = "PAUSED";
    timerCard.classList.remove("running");
}

function resetTimer(){

    clearInterval(timer);
    timer = null;

    ms = 0;
    sec = 0;
    min = 0;

    updateDisplay();

    statusText.textContent = "READY";
    timerCard.classList.remove("running");

    laps.innerHTML = "";
}

function addLap(){

    if(timer === null) return;

    const li = document.createElement("li");

    li.textContent =
    `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(ms).padStart(2,'0')}`;

    laps.prepend(li);
}

startBtn.addEventListener("click",startTimer);
pauseBtn.addEventListener("click",pauseTimer);
resetBtn.addEventListener("click",resetTimer);
lapBtn.addEventListener("click",addLap);

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){
e.preventDefault();

if(timer===null){
startTimer();
}else{
pauseTimer();
}
}

if(e.key==="l" || e.key==="L"){
addLap();
}

if(e.key==="r" || e.key==="R"){
resetTimer();
}

});

updateDisp