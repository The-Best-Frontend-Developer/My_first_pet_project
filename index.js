const burgerMenuButtonSvg = document.querySelectorAll(".burger-menu__svg")
const burgerMenuButton = document.querySelector(".burger-menu__button")
const burgerMenuList = document.querySelector(".burger-menu__list")
const slider = document.querySelector('.slider')
const previousButton = document.querySelector(".slider__previous-button")
const nextButton = document.querySelector(".slider__next-button")
let currentSlide = document.querySelector(".current-slide")
let currentSlideMobileChildren = document.querySelectorAll('.current-slide-mobile__item')
let totalSlides = 3
let currentIndex = 0
let startX = 0;
let endX;
let autoScrollInterval;
let userInteractionTimeout;
let currentSlider;
let screenWidth = window.innerWidth

const getCurrentSlider = () => {
    screenWidth = window.innerWidth
    if (screenWidth >= 1200) {
        return '';
    } else if (screenWidth < 1200 && screenWidth >= 930) {
        return '2';
    } else if (screenWidth < 930 && screenWidth >= 600) {
        return '3';
    } else {
        totalSlides = 4
        return '4';
    }
};

currentSlider = getCurrentSlider();

let slidesContainer = document.querySelector(`.slider${currentSlider}-slides`)



burgerMenuButton.addEventListener('click', () => {
    burgerMenuButtonSvg.forEach((el) => {el.classList.toggle("active")})
    burgerMenuList.classList.toggle("active")
})

previousButton.addEventListener('click', () => {
    prevSlide();
})

nextButton.addEventListener('click', () => {
    nextSlide();
})

slider.addEventListener('touchstart', (event) => {
    currentSlider = getCurrentSlider();
    if (currentSlider === '4') {
        const touch = event.touches[0];
        startX = touch.clientX;
    }
})

slider.addEventListener('touchend', (event) => {

    currentSlider = getCurrentSlider();
    if (currentSlider === '4') {
        const touch = event.changedTouches[0];
        endX = touch.clientX;

        const diffX = endX - startX;

        if (diffX > 30) {
            showSlide4(currentIndex - 1);
        } else if (diffX < -30) {
            showSlide4(currentIndex + 1);
        }
    }
})

const startAutoScroll = () => {
    screenWidth = window.innerWidth
    if (screenWidth >= 930) {
        autoScrollInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    }
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
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    currentSlider = getCurrentSlider();

    if (currentSlider === 4) {
        showSlide4(currentIndex);
    }

    slidesContainer = document.querySelector(`.slider${currentSlider}-slides`)

    if (currentIndex === 0) {
        slidesContainer.style.transform = 'translateX(0%)';
        currentSlide.innerText = '1 из 3'
    } else if (currentIndex === 1) {
        slidesContainer.style.transform = 'translateX(-33.33%)';
        currentSlide.innerText = '2 из 3'
    } else if (currentIndex === 2) {
        slidesContainer.style.transform = 'translateX(-66.66%)';
        currentSlide.innerText = '3 из 3'
    }
}

const showSlide4 = (index) => {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    if (currentIndex === 0) {
        slidesContainer.style.transform = 'translateX(0%)';
    } else if (currentIndex === 1) {
        slidesContainer.style.transform = 'translateX(-25%)';
    } else if (currentIndex === 2) {
        slidesContainer.style.transform = 'translateX(-50%)';
    } else if (currentIndex === 3) {
        slidesContainer.style.transform = 'translateX(-75%)';
    }

    currentSlideMobileChildren.forEach(el =>
        el.classList.remove('active')
    );

    currentSlideMobileChildren[currentIndex].classList.add('active')
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

window.addEventListener('resize', () => {
    showSlide(currentIndex);
    stopAutoScroll();
    startAutoScroll();
})


showSlide(currentIndex);

if (screenWidth >= 930) {
    restartAutoScrollWithDelay();
}