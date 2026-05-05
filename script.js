// Carousel

'use strict';
const imgs = document.querySelectorAll(".img");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const row = document.querySelector("#imglist");

const navBtns = document.querySelectorAll(".nav button");

const slideWidth = imgs[0].clientWidth;

const totalSlides = imgs.length;

let currentIndex = 1;
let isAnimating = false;

const updateUI = () => {
    row.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    
    const currentbtn = document.querySelector('.currentslide');
    if (currentbtn) currentbtn.classList.remove('currentslide');

    if (currentIndex >= totalSlides - 1) {
        navBtns[0].classList.add('currentslide');
    } else if (currentIndex <= 0) {
        navBtns[navBtns.length - 1].classList.add('currentslide');
    } else {
    navBtns[currentIndex-1].classList.add('currentslide');
    }
}

const checkReset = () => {
    if (currentIndex === totalSlides - 1) {
        row.style.transition = 'none';
        row.style.transform = `translateX(-${slideWidth}px)`;
        currentIndex = 1;
        row.offsetHeight;
        row.style.transition = "transform 800ms ease";
    } else if (currentIndex === 0) {
        row.style.transition = 'none';
        row.style.transform = `translateX(-${slideWidth * (totalSlides - 2)}px)`;
        currentIndex = totalSlides - 2;
        row.offsetHeight;
        row.style.transition = "transform 800ms ease";
    }
}

const nextImage = () => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updateUI();
}

const prevImage = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex--;
    updateUI();
}

const creatingNav = () => {
    navBtns.forEach((value, index) => {
        value.addEventListener('click', (e) => {
            currentIndex = index + 1;
            updateUI();
        })
    })
} 

row.addEventListener('transitionend', () => {
    checkReset();
    isAnimating = false;
})



prevBtn.addEventListener('click', prevImage)
nextBtn.addEventListener('click', nextImage)
creatingNav();
row.style.transform = `translateX(-${slideWidth}px)`;

setInterval(() => {
    if (!isAnimating) {
    currentIndex++;
    updateUI();
    }
}, 5000);
