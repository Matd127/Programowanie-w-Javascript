document.addEventListener("keypress", onKeyPress);
const RECORDING_KEY = "82";
const PLAYING_KEY = "80";
let isPlaying = false;
let isRecording = false;

document.addEventListener("keydown", (e) => {
  let audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  let tune = document.querySelector(`.tune[data-key='${e.keyCode}']`);
  if (tune != null) {
    tune.classList.add("playing");
    audio.currentTime = 0;
    if (audio != null) audio.play();

    setTimeout(function () {
      tune.classList.remove("playing");
    }, 100);
  }
});

const records = [];
const currentRecording = {
  startTime: 0,
  endTime: 0,
  notes: [],
};

function recordingButtonPressed() {
  changeRecordingStatus();
  startRecording();
}

function startRecording() {
  currentRecording.notes = [];
  currentRecording.startTime = Date.now();
}

function endRecording() {
  currentRecording.endTime = Date.now();
  console.log(currentRecording);

  if (currentRecording.notes.length > 0) {
    const recordingWithTimeStamps = [];

    for (let i = 0; i < currentRecording.notes.length; i++) {
      recordingWithTimeStamps.push([
        currentRecording.notes[i][0],
        currentRecording.notes[i][1] - currentRecording.startTime,
      ]);
    }

    records.push(recordingWithTimeStamps);
    displayRecord();
  }
}

function recordSound(sound) {
  currentRecording.notes.push([sound, Date.now()]);
  // playSound(sound);
}
function onKeyPress(e) {
  const sound = document.querySelector(`audio[data-key='${e.keyCode}']`);
  if (sound != null && isRecording == true) {
    recordSound(sound);
  }
}

function displayRecord() {
  console.log(records);
}

function recordingControl(event) {
  if (event.keyCode === Number(RECORDING_KEY)) {
    if (!isRecording) {
      console.log("Start");
      isRecording = true;
      startRecording();
    } else {
      isRecording = false;
      console.log("Stop");
      endRecording();
    }
  }
}

window.addEventListener("keydown", recordingControl);
