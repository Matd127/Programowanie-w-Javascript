const slide = document.querySelector(".slides-slide")
const slideImages = document.querySelectorAll(".slides-slide img")

const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

const navigationDots = document.querySelectorAll(".navigation-dots .single-dot")

let counter = 0;
const size = slideImages[0].clientWidth

nextBtn.addEventListener('click', () => {
    slide.style.transition = "transform 0.4s ease-in-out"
    counter++;
    if(counter > 2){
        counter = 0
        slide.style.transition = "transform 0.4s ease-in-out"
        slide.style.transform = 'translateX(' + (-600 * counter) + 'px)'
    }
    slide.style.transform = 'translateX(' + (-600 * counter) + 'px)'
})

prevBtn.addEventListener('click', () => {
    slide.style.transition = "transform 0.4s ease-in-out"
    counter--;
    if(counter < 0){
        counter = 2
        slide.style.transition = "transform 0.4s ease-in-out"
        slide.style.transform = 'translateX(' + (-600 * counter) + 'px)'
    }
    slide.style.transform = 'translateX(' + (-600 * counter) + 'px)'
})

for(let i = 0; i < navigationDots.length; i++){
    navigationDots[i].addEventListener("click", () => {
        counter = i;
        slide.style.transition = "transform 0.4s ease-in-out"
        slide.style.transform = 'translateX(' + (-600 * counter) + 'px)'
    })
}

