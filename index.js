const burgerMenuButtonSvg = document.querySelectorAll(".burger-menu__svg")
const burgerMenuButton = document.querySelector(".burger-menu__button")
const burgerMenuList = document.querySelector(".burger-menu__list")
const slider = document.querySelector('.slider')
const slidesContainer = document.querySelector(".slider-slides")
const slides = document.querySelectorAll(".slider-slide")
const totalSlides = slides.length
const previousButton = document.querySelector(".slider__previous-button")
const nextButton = document.querySelector(".slider__next-button")
const currentSlide = document.querySelector(".current-slide")
let currentIndex = -1
let autoScrollInterval;
let userInteractionTimeout;
const screenWidth = window.innerWidth



burgerMenuButton.addEventListener('click', () => {
    burgerMenuButtonSvg.forEach((el) => {el.classList.toggle("active")})
    burgerMenuList.classList.toggle("active")
})

previousButton.addEventListener('click', () => {
    prevSlide()
})

nextButton.addEventListener('click', () => {
    nextSlide()
})

const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 4000);
};

const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

const restartAutoScrollWithDelay = () => {
    stopAutoScroll();
    clearTimeout(userInteractionTimeout);
    userInteractionTimeout = setTimeout(() => {
        startAutoScroll();
    }, 3000);
};


slider.addEventListener("mouseenter", stopAutoScroll);
slider.addEventListener("mouseleave", restartAutoScrollWithDelay);


const showSlide = (index) => {
    if (index < -1) {
        currentIndex = totalSlides - 2;
    } else if (index >= totalSlides - 1) {
        currentIndex = -1;
    } else {
        currentIndex = index;
    }

    if (currentIndex === -1) {
        slidesContainer.style.transform = 'translateX(33.3%)';
        currentSlide.innerText = '1 из 3'
    } else if (currentIndex === 0) {
        slidesContainer.style.transform = 'translateX(0%)';
        currentSlide.innerText = '2 из 3'
    } else {
        slidesContainer.style.transform = 'translateX(-33.3%)';
        currentSlide.innerText = '3 из 3'
    }
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

if (screenWidth >= 1200) {
    showSlide(currentIndex);
    restartAutoScrollWithDelay();
}