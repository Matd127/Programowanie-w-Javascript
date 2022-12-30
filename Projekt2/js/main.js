const slide = document.querySelector(".slides-slide");
const slideImages = document.querySelectorAll(".slides-slide img");
const slideContainer = document.querySelector(".slides-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const navigationDots = document.querySelectorAll(
  ".navigation-dots .single-dot"
);
const animationBtn = document.querySelector(".animation-toggle_btn");
const imgResized = document.querySelector('.img_resized');
const overlay = document.querySelector('.overlay')

let counter = 0;
let isFade = false;

const toggleImg = () => {
  imgResized.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

function move(slide, counter) {
  slide.style.transition = "transform 0.4s ease-in-out";
  slide.style.transform = "translateX(" + -600 * counter + "px)";
}

function fade(slide, counter) {
  slide.style.transition = "none";
  slide.classList.remove("fade");
  slide.style.transform = "translateX(" + -600 * counter + "px)";
  setTimeout(() => {
    slide.classList.add("fade");
  }, 10);
}

function animateSlider(slide, counter) {
  isFade ? fade(slide, counter) : move(slide, counter)   
}

animationBtn.addEventListener("click", () => {
  if (animationBtn.textContent === "Przesuwanie") {
    animationBtn.textContent = "Przenikanie";
    isFade = true;
  } else {
    animationBtn.textContent = "Przesuwanie";
    isFade = false;
  }
});

nextBtn.addEventListener("click", () => {
  counter++;
  if (counter > 2) counter = 0;
  animateSlider(slide, counter) 
});

prevBtn.addEventListener("click", () => {
  counter--;
  if (counter < 0) counter = 2;
  animateSlider(slide, counter)
});

navigationDots.forEach(function (dot, i) {
  dot.addEventListener("click", () => {
    counter = i;
    animateSlider(slide, counter) 
  });
});

const moveSlide = function () {
  counter++;
  animateSlider(slide, counter) 

  if (counter > 2) {
    counter = 0;
    animateSlider(slide, counter) 
  }
};

let intervalRef = setInterval(moveSlide, 2000);
slideImages.forEach(function (image) {
  image.addEventListener("mouseover", () => {
    if (intervalRef) clearInterval(intervalRef);
    intervalRef = undefined;
  });
});

slideImages.forEach(function (image) {
  image.addEventListener("mouseout", () => {
    if (!intervalRef)
      intervalRef = setInterval(moveSlide, 2000);
  });
});

slideImages.forEach(function (image) {
  image.addEventListener("click", () => {
    toggleImg();
    imgResized.textContent = ''
    clearInterval(intervalRef)
    intervalRef = undefined;
    const src = image.getAttribute("src")
    const img = document.createElement('img');
    img.setAttribute("alt", "slide_image")
    img.setAttribute("src", src)
    imgResized.append(img)
  });
});

overlay.addEventListener('click', () => {
  toggleImg();
  if(!intervalRef) intervalRef = setInterval(moveSlide, 2000);
});