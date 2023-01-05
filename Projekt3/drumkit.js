document.addEventListener("keypress", onKeyPress);
const tracks = document.querySelector('.tracks');
const RECORDING_KEY = "82";
const PLAYING_KEY = "80";
let isPlaying = false;
let isRecording = false;
const records = [];
const currentRecording = {
  startTime: 0,
  endTime: 0,
  notes: [],
};

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
    displayRecord(records.length);
  }
}

function recordSound(sound) {
  currentRecording.notes.push([sound, Date.now()]);
}

function onKeyPress(e) {
  const sound = document.querySelector(`audio[data-key='${e.keyCode}']`);
  if (sound != null && isRecording == true) {
    recordSound(sound);
  }
}

function displayRecord(record) {
  console.log(records);
  const track = document.createElement('div');
  track.classList.add()
  console.log(record)
  track.innerHTML = `<div>${record}</div> <div class='play'>▶</div>`

  const playTrack = track.querySelector('.play').addEventListener('click', () => {
    playRecord();
  })
  tracks.appendChild(track);
}

function recordingControl(event) {
  if (event.keyCode === Number(RECORDING_KEY)) {
    if (!isRecording) {
      isRecording = true;
      startRecording();
    } else {
      isRecording = false;
      endRecording();
    }
  }
}

function playRecord(){
  for(const [record, timeout] of records.flat()){
    console.log(record, timeout)
    setTimeout(() => {
      record.currentTime = 0;
      record.play();
    }, timeout);
  }
}

window.addEventListener("keydown", recordingControl);