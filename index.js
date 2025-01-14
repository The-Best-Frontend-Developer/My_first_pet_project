const burgerMenuButtonSvg = document.querySelectorAll(".burger-menu__svg")
const burgerMenuButton = document.querySelector(".burger-menu__button")
const burgerMenuList = document.querySelector(".burger-menu__list")
const slider = document.querySelector('.slider')
const previousButton = document.querySelector(".slider__previous-button")
const nextButton = document.querySelector(".slider__next-button")
const supportForm = document.querySelector('.fourth-section__support-form')
const supportFormEmailInput = document.getElementById('user-email-id')
const supportFormNameInput = document.getElementById('user-name-id')
const validEmailErrorText = document.querySelector('.valid-email-error')
const validNameErrorText = document.querySelector('.valid-name-error')
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
let slidesContainer;



burgerMenuButton.addEventListener('click', () => {
    burgerMenuButtonSvg.forEach((el) => {el.classList.toggle("active")})
    burgerMenuList.classList.toggle("active")
})

// ПОЛУЧАЕМ ОТ ШИРИНЫ ЭКРАНА ЗНАЧЕНИЯ
const getCurrentSlider = () => {
    screenWidth = window.innerWidth
    if (screenWidth > 1200) {
        totalSlides = 3
        slidesContainer = document.querySelector(`.slider-slides`)
        currentSlider = 1
    } else if (screenWidth <= 1200 && screenWidth > 930) {
        totalSlides = 3
        slidesContainer = document.querySelector(`.slider2-slides`)
        currentSlider = 2
    } else if (screenWidth <= 930 && screenWidth > 600) {
        totalSlides = 3
        slidesContainer = document.querySelector(`.slider3-slides`)
        currentSlider = 3
    } else if (screenWidth <= 600) {
        totalSlides = 4
        slidesContainer = document.querySelector(`.slider4-slides`)
        currentSlider = 4
    }
};

// ОБРАБОТКА СВАЙПОВ
slider.addEventListener('touchstart', (event) => {
    getCurrentSlider();
    if (currentSlider === 4) {
        const touch = event.touches[0];
        startX = touch.clientX;
    }
})

slider.addEventListener('touchend', (event) => {
    getCurrentSlider();
    if (currentSlider === 4) {
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

previousButton.addEventListener('click', () => {
    prevSlide();
})

nextButton.addEventListener('click', () => {
    nextSlide();
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
    getCurrentSlider();

    if (currentSlider === 4) {
        showSlide4(currentIndex);
        return;
    }

    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

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


// ВАЛИДАЦИЯ ФОРМЫ
supportFormEmailInput.addEventListener('focusout', () => {
    emailValidation();
})
supportFormEmailInput.addEventListener('input', () => {
    hideError('email');
})
supportFormNameInput.addEventListener('focusout', () => {
    nameValidation();
})
supportFormNameInput.addEventListener('input', () => {
    hideError('name');
})

supportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let emailErrorValidation = nameValidation();
    let nameErrorValidation = emailValidation();
    if (emailErrorValidation === 0 || nameErrorValidation === 0) {
        // supportForm.submit();
        alert('Сообщение отправлено успешно!')
    }
})

const emailValidation = () => {
    const emailPattern = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = supportFormEmailInput.value;
    if (emailPattern.test(emailValue)) {
        hideError('email');
        return 0;
    } else {
        showError('email');
        return 1;
    }
}

const nameValidation = () => {
    const namePattern = /^$|^[a-zA-Zа-яА-ЯёЁ]+$/;
    const nameValue = supportFormNameInput.value;
    if (namePattern.test(nameValue)) {
        hideError('name');
        return 0;
    } else {
        showError('name');
        return 1;
    }
}

const showError = (typeError) => {
    if (typeError === 'email') {
        validEmailErrorText.classList.add('error');
    } else if (typeError === 'name') {
        validNameErrorText.classList.add('error');
    } else {
        validEmailErrorText.classList.add('error');
        validNameErrorText.classList.add('error');
    }
}

const hideError = (typeError) => {
    if (typeError === 'email') {
        validEmailErrorText.classList.remove('error');
    } else if (typeError === 'name') {
        validNameErrorText.classList.remove('error');
    } else {
        validEmailErrorText.classList.remove('error');
        validNameErrorText.classList.remove('error');
    }
}

// ЗАПУСК НУЖНЫХ ФУНКЦИЙ (ИНИЦИЛИЗАЦИЯ)
showSlide(currentIndex);
if (screenWidth >= 930) {
    restartAutoScrollWithDelay();
}