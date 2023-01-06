window.addEventListener("deviceorientation", onDeviceMove);
const ball = document.querySelector(".ball");
const field = document.querySelector(".field");
const timeClock = document.querySelector(".time");
let records = [];

const maxX = field.clientWidth - ball.clientWidth;
const maxY = field.clientHeight - ball.clientHeight;

function genetateHole(x, y) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  hole.style.top = `${Math.random() * (x - 40)}px`;
  hole.style.left = `${Math.random() * (y - 40)}px`;
  field.appendChild(hole);
}

function startTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    timeClock.textContent = `${min}:${sec}`;
    time++;
  };

  let time = 0;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}
let timer;

function initGame() {
  //Zmienić na 10 po zakończonych testach
  for (let i = 0; i < 1; i++) {
    genetateHole(field.clientWidth - 40, field.clientHeight - 40);
  }
  timer = startTimer();
}
initGame();

function detectWhenBallinHole(ball, hole) {
  const ballPositionTop = parseInt(ball.style.top);
  const ballPositionLeft = parseInt(ball.style.left);

  if (hole) {
    const holePositionTop = parseInt(hole.style.top);
    const holePositionLeft = parseInt(hole.style.left);

    if (
      ballPositionTop < holePositionTop + 20 &&
      ballPositionTop > holePositionTop - 20 &&
      ballPositionLeft < holePositionLeft + 20 &&
      ballPositionLeft > holePositionLeft - 20
    )
      hole.remove();
  }
}

function sortRecords(records) {
  records.sort((a, b) => {
    let timeA = a.split(":");
    let timeB = b.split(":");
    let totalA = +timeA[0] * 60 + +timeA[1];
    let totalB = +timeB[0] * 60 + +timeB[1];
    return totalA - totalB;
  });
}

function displayRecords(records) {
  let output = "";
  if (records.length > 1) {
    sortRecords(records);
  }

  records.forEach((record, index) => {
    output += `${index + 1} : ${record} \n`;
  });
  return output;
}

function onDeviceMove(e) {
  const holes = field.querySelectorAll(".hole");
  let x = e.beta;
  let y = e.gamma;

  if (x > 90) x = 90;
  if (x < -90) x = -90;

  x += 90;
  y += 90;

  ball.style.top = `${(maxY * y) / 180}px`;
  ball.style.left = `${(maxX * x) / 180}px`;

  if (holes.length === 0) {
    records.push(timeClock.textContent);
    clearInterval(timer);
    alert(
      `Koniec gry! twój czas to: ${
        timeClock.textContent
      } \n Rekordy: ${displayRecords(records)}`
    );
    initGame();
  }

  holes.forEach((hole) => {
    detectWhenBallinHole(ball, hole);
  });
}