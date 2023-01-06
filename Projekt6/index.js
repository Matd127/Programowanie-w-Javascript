window.addEventListener("deviceorientation", onDeviceMove);
const ball = document.querySelector(".ball");
const field = document.querySelector(".field");
const output = document.querySelector(".output");

const maxX = field.clientWidth - ball.clientWidth;
const maxY = field.clientHeight - ball.clientHeight;

function genetateHole(x, y) {
  const hole = document.createElement("div");
  hole.classList.add('hole');
  hole.style.top = `${Math.random()*(x-40)}px`;
  hole.style.left = `${Math.random()*(y-40)}px`;
  console.log(hole.style.top)
  console.log(hole.style.left)
  field.appendChild(hole);
}
genetateHole(field.clientWidth - 40, field.clientHeight - 40)

function detectWhenBallinHole(ball, hole) {

    const ballPositionTop = parseInt(ball.style.top) 
    const ballPositionLeft = parseInt(ball.style.left)
  
    if(hole){
      const holePositionTop = parseInt(hole.style.top)
      const holePositionLeft = parseInt(hole.style.left)
  
      if (ballPositionTop < (holePositionTop + 20) && ballPositionTop > (holePositionTop - 20) &&
      ballPositionLeft < (holePositionLeft + 20) && ballPositionLeft > (holePositionLeft - 20)) {
        console.log("Ball is in the hole!");
        hole.remove();
      //   genetateHole(field.clientWidth - 40, field.clientHeight - 40)
    } 
    }
}

function onDeviceMove(e) {
  const hole = field.querySelector('.hole');
  
  let x = e.beta;
  let y = e.gamma;

  output.textContent = `Beta: ${x} \n Gamma: ${y}`;

  if (x > 90) x = 90;
  if (x < -90) x = -90;

  x += 90;
  y += 90;

  ball.style.top = `${(maxY * y) / 180}px`;
  ball.style.left = `${(maxX * x) / 180}px`;

  detectWhenBallinHole(ball, hole)
}

// function animate() {
//     //    console.log(Date.now())
//     // requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate)
