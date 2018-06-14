var pickedTime = 0.05, //time selected/inputted by user
  minutes,
  seconds,
  isPaused = true, //verify if timer is paused
  firstClick = true, //apply specific attributes if first time clicking 'play'
  timeInterval, //contains setInterval()
  times = document.querySelectorAll(".time"), 
  inputTime = document.getElementById("value"), 
  clock = document.getElementById("clock"), 
  playBtn = document.getElementById("play"),
  stopBtn = document.getElementById("stop"),
  alarm = document.getElementById("alarm");

//initialize click listener for user input
presetEventListener();

//assign click listener to preset buttons
function presetEventListener() {
  times.forEach((time, i) => {
    time.addEventListener("click", setMinutes);
  });
}

//clear preset buttons click listener
function clearPresetEventListener() {
  times.forEach((time, i) => {
    time.removeEventListener("click", setMinutes);
  });
}

//set clock to selected time
function setMinutes() {
  pickedTime = parseInt(this.textContent);
  if (isNaN(pickedTime)) {
    pickedTime = 0;
  }
  clearSelected(); //clears any attributes assigned to user input buttons
  inputTime.onchange = updateSelectedTime; //update timer per user input
  updateClock(pickedTime, 0, 0);
  firstClick = true;
  this.style.backgroundColor = "#494949";
  clock.style.color = "white";
}

//assign click listener to Play/Pause button
playBtn.addEventListener("click", initPlay);

//initialize timer
function initPlay() {

  //initial setup of timer
  if (firstClick === true && pickedTime !== 0 && isPaused === true) {
    isPaused = false;
    initClock(pickedTime);
    firstClick = false;
    playBtn.textContent = "||";
    clearPresetEventListener();
  }

  //timer play/pause after initial start
  else {
    if (pickedTime !== 0) {
      isPaused = !isPaused;
      isPaused ? playBtn.textContent = ">" : playBtn.textContent = "||";
    }
  }
}

//assign click listener to Stop
stopBtn.addEventListener("click", function () {
  presetEventListener();
  resetAttributes();
  alarm.pause();
  alarm.currentTime = 0;
});

function resetAttributes() {
  isPaused = true;
  firstClick = true;
  playBtn.textContent = ">";
}

//set timer to user inputted time
function updateSelectedTime() {
  
  pickedTime = inputTime.value;

  //check if input is integer within range
  if (pickedTime < 1 ||
    pickedTime > 60 ||
    parseFloat(Number(pickedTime)) !== Number(pickedTime)) {
    alert("Please input integer between 1 and 60 inclusive.");
    inputTime.value = "";
  }
  else {
    pickedTime = parseInt(inputTime.value);
    firstClick && updateClock(pickedTime, 0, 0);
  }
}

//clear attributes of minutes buttons
function clearSelected() {
  times.forEach(function (time, i) {
    time.style.backgroundColor = "";
    inputTime.value = "";
  })
}

function initClock(t) {
  clearInterval(timeInterval);
  clock.style.color = "white";
  let globalTime = t * 60 * 1000; //convert to milliseconds

  //start timer
  timeInterval = setInterval(function () {
    if (!isPaused) {
      minutes = Math.floor(globalTime / 1000 / 60);
      seconds = Math.floor(globalTime / 1000 % 60);
      millisec = Math.floor(globalTime / 10);

      updateClock(minutes, seconds, millisec);

      if (globalTime <= 0) {
        clearInterval(timeInterval);
        resetAttributes();
        clock.style.color = "red";
        alarm.play();
        presetEventListener();
      }

      globalTime -= 10;

    }

  }, 10);
}

//update clock display
function updateClock(m, s, ms) {
  clock.textContent = ("0" + m).slice(-2) + ":" +
    ("0" + s).slice(-2) + ":" + ("0" + ms).slice(-2);
}