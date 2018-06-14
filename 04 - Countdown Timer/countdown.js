var pickedTime = 0.0,
  minutes,
  seconds,
  isPaused = true,
  firstClick = true,
  globalTime,
  lastPickedTime = 0.0,
  timeInterval,
  times = document.querySelectorAll(".time"),
  inputTime = document.getElementById('value'),
  clock = document.getElementById("clock"),
  playBtn = document.getElementById("play"),
  stopBtn = document.getElementById("stop"),
  alarm = document.getElementById("alarm");

//assign click listener to time designated buttons
times.forEach(function (time, i) {
  time.addEventListener("click", setMinutes);
});

//sets clock to selected time
function setMinutes() {
  pickedTime = parseInt(this.innerHTML);
  if (isNaN(pickedTime)) {
    pickedTime = 0;
  }
  clearSelected();
  inputTime.onchange = updateSelectedTime;
  lastPickedTime = pickedTime;
  updateClock(pickedTime, 0, 0);
  firstClick = true;
  this.style.backgroundColor = "#494949";
  clock.style.color = "white";
}

//assign user input time to pickedTime
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
    lastPickedTime = pickedTime;
    updateClock(pickedTime, 0, 0);
  }
}

//assign click listener to Play/Pause button
playBtn.addEventListener("click", initPlay);

function initPlay() {

  inputTime.setAttribute("id", "");
  //prevents pausing at first click (which starts timer)
  if (firstClick === true && pickedTime !== 0 && isPaused === true) {
    isPaused = false;
    pickedTime = pickedTime * 60 * 1000;
    initClock(pickedTime);
    firstClick = false;
  }
  //pauses if timer selected and started
  else {
    if (pickedTime !== 0) {
      isPaused = !isPaused;
      isPaused ? playBtn.textContent = "||" : playBtn.innerHTML = ">";
    }
  }
}

//assign click listener to Stop
stopBtn.addEventListener("click", function () {
  times.forEach(function (time, i) {
    time.addEventListener("click", setMinutes);
  });
  inputTime.setAttribute("id", "value");
  isPaused = true;
  playBtn.innerHTML = ">";
  pickedTime = lastPickedTime;
  firstClick = true;
  alarm.pause();
  alarm.currentTime = 0;
  // clock.style.color = "white";
});

//clear attributes of minutes buttons
function clearSelected() {
  times.forEach(function (time, i) {
    time.style.backgroundColor = "";
    inputTime.value = "";
  })
}

function initClock(t) {
  clearInterval(timeInterval);
  globalTime = t;
  var offset = 0;
  timeInterval = setInterval(function () {
    if (!isPaused) {
      minutes = Math.floor(globalTime / 1000 / 60);
      seconds = Math.floor(globalTime / 1000 % 60);
      millisec = Math.floor(globalTime / 10);

      updateClock(minutes, seconds, millisec);

      if (globalTime <= 0) {
        clearInterval(timeInterval);
        isPaused = true;
        firstClick = true;
        pickedTime = lastPickedTime;
        clock.style.color = "red";
        alarm.play();
        times.forEach(function (time, i) {
          time.addEventListener("click", setMinutes);
        });
      }

      globalTime -= 10;

    }

  }, 10);
}

function updateClock(m, s, ms) {
  clock.innerHTML = ("0" + m).slice(-2) + ":" +
    ("0" + s).slice(-2) + ":" + ("0" + ms).slice(-2);
}