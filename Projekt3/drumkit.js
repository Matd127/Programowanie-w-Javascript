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

document.addEventListener("keydown", (e) => {
  let audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  let tune = document.querySelector(`.tune[data-key='${e.keyCode}']`);
  tune.classList.add("playing");
  audio.currentTime = 0;
  if (audio != null) audio.play();
  
  setTimeout(function () {
    tune.classList.remove("playing");
  }, 100);
});