const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5
})

const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

const particleArr = [];

class Particle{
    constructor(){
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.size = Math.random() * 20 + 1 //Rozmiar kulek?
        this.speedX = Math.random() * 3 - 1.5 //Szybkość kulek po osi x?
        this.speedY = Math.random() * 3 - 1.5 //Szybkość kulek po osi y?
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x + this.speedX > canvas.width - this.size ||
            this.x + this.speedX < this.size) {
                this.speedX = this.speedX;
        }
        
        if(this.y + this.speedY > canvas.height - this.size ||
            this.y + this.speedY < this.size){
                this.speedY = this.speedY
        }
               
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
    }
}

function init() {
    for(let i = 0; i < 10; i++ ){
        particleArr.push(new Particle())
    }
}
init();

function handle(){
    for(let i = 0; i < particleArr.length; i++){
        particleArr[i].draw();
        particleArr[i].update();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handle();
    requestAnimationFrame(animate)
}

animate();