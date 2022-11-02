// const START_RECORDING_KEY = '1'
// document.addEventListener('keypress', onKeyPress)

// function onKeyPress(event){
//     console.log(event)
//     const key = event.key
//     const audioId = 'clap'
//     playSound(audioId)
// }

// function playSound(sound) {
//     const audioTag = document.querySelector(`#${sound}`)
//     audioTag.currentTime = 0;
//     audioTag.play()
// }

//Date.now
const RECORDING_KEY = '82';
const PLAYING_KEY = '80';
let isPlaying = false;
let isRecording = false;
let tunes = [];
let timing = [];


document.addEventListener("keydown", (event) => {
  let audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
  let tune = document.querySelector(`.tune[data-key='${event.keyCode}']`);
  if(tune != null) {
    tune.classList.add("playing");
    audio.currentTime = 0;
    if (audio != null) audio.play();
    
    setTimeout(function () {
      tune.classList.remove("playing");
    }, 100);
  }
  });

function initRecording() {
  isRecording = true;
  tunes.splice(0, tunes.length);
  timing.splice(0, timing.length)
}

function stopRecording() {
  isRecording = false;
}

function recording(keyCode){
  tunes.push(keyCode);
  timing.push(Date.now());
}

function recordingControl(event){
  if(event.keyCode == RECORDING_KEY){
      if(!isRecording)
        initRecording();
      else
        stopRecording();
  }
}

window.addEventListener("keydown", recordingControl)